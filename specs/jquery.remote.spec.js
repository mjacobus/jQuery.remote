describe("jQuery.remote()", function () {
  var $container, $anchor;

  it("returns the selected element", function () {
    loadFixtures('example_link.html');
    $anchor = $('a[data-remote]');
    expect($anchor.remote()).toBe($anchor);
    expect($anchor.remote().length).toEqual(2);
  });
});

