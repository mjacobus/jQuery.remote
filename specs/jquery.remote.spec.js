describe("jQuery.remote()", function () {
  var container, anchor;

  beforeEach(function () {
    container = '<div id="container"></div>';
    $('body').append(container);
  });

  afterEach(function () {
    $('#container').remove();
  });

  it("returns the selected element", function () {
    anchor = $('a');
    expect(anchor.remote()).toBe(anchor);
  });
});

