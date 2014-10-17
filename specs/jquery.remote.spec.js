describe("jQuery.remote()", function () {

  it("returns the selected element", function () {
    loadFixtures('example_link.html');
    anchor = $('a[data-remote]');
    expect(anchor.remote()).toBe(anchor);
    expect(anchor.remote().length).toEqual(2);
  });

  describe("jQuery.remote().trigger('click')", function () {
    var request;

    describe("on ajax success", function () {
      beforeEach(function () {
        loadFixtures("ajax_example.html");
        jasmine.Ajax.install();
        $('a[data-remote]').remote();
      });

      it("replaces content to the target", function () {
        $('a[data-remote]:first').click();

        request = jasmine.Ajax.requests.mostRecent();
        request.response(AjaxResponses.example.success);

        expect(request.url).toEqual("/first.php");

        expect($("#first").html()).toEqual('<p>Success</p>');
        expect($("#second").html()).toEqual('<p>original</p>');
      });

      it("appends content to the target", function () {
        $('[data-remote]:last').trigger('click');

        request = jasmine.Ajax.requests.mostRecent();
        request.response(AjaxResponses.example.success);

        expect(request.url).toEqual("/second.php");

        expect($("#first").html()).toEqual('<p>original</p>');
        expect($("#second").html()).toEqual(
          '<p>original</p>' +
          '<p>Success</p>'
        );
      });
    });
  });
});

