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

describe("jQueryRemote", function () {
  var subject, element,
    factory = function (element, options) {
      if (typeof(element) === 'string') {
        element = $(element);
      }

      return new jQueryRemote($, element, options);
    };

  describe("getOptions()", function () {
    describe("url", function () {
      it("returns element href when element is an anchor", function () {
        element = $('<a href="sample.php"/>');
        subject = factory(element);

        expect(subject.getOptions().url).toEqual('sample.php');
      });

      it("returns element action when element is an form", function () {
        element = $('<form action="sample.php"/>');
        subject = factory(element);

        expect(subject.getOptions().url).toEqual('sample.php');
      });

      describe("type", function () {
        it("returns GET by defautl", function () {
          expect(factory($('<a href="#" />')).getOptions().type).toEqual('GET');
        });

        it("returns the element data-method when defined", function () {
          expect(
            factory($('<a href="#" data-method="post" />')).getOptions().type
          ).toEqual('POST');
        });

        it("returns the form method when defined", function () {
          expect(
            factory($('<form method="post" />')).getOptions().type
          ).toEqual('POST');
        });
      });
    });

    describe("data", function () {
      it("returns empty on anchors", function () {
        expect(
          factory($('<a href="#" data-method="post" />')).getOptions().data
        ).toEqual({});
      });

      it("returns serialized form values when element is a form", function () {
        subject = factory('<form><input name="foo" value="bar" /></form>');
        expect(subject.getOptions().data).toEqual('foo=bar');
      });

      it("can be overriten by a function", function () {
        subject = factory('<form data-foo="bar"><input name="foo" value="bar" /></form>', {
          data: { foo: 'bar' }
        });

        expect(subject.getOptions().data).toEqual({foo: 'bar'});
      });

      it("can be overriten by a function", function () {
        subject = factory('<form data-foo="bar"><input name="foo" value="bar" /></form>', {
          data: function () {
            var value = this.$element.data('foo');

            return { foo: value };
          }
        });

        expect(subject.getOptions().data).toEqual({foo: 'bar'});
      });
    });

  });
});

