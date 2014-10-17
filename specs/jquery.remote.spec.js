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

  describe("#getOptions()", function () {
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

      it("returns the given option when given", function () {
        element = $('<a href="sample.php"/>');
        subject = factory(element, { url: 'custom.php' });

        expect(subject.getOptions().url).toEqual('custom.php');
      });
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

      it("returns the given option when given", function () {
        expect(
          factory($('<form method="post" />'), { type: 'get' }).getOptions().type
          ).toEqual('GET');
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

  describe("#getTargetSelector", function () {
    it("returns the target selector", function () {
      subject = factory('<a/>');
      expect(subject.getTargetSelector()).toBeUndefined();

      subject = factory('<a data-target="#target"/>');
      expect(subject.getTargetSelector()).toEqual('#target');

      subject = factory('<a data-target="#target"/>', { target: '#other' });
      expect(subject.getTargetSelector()).toEqual('#other');
    });
  });

  describe("#getTarget", function () {
    afterEach(function () {
      $('#container').remove();
    });

    it("returns null target when no target is given", function () {
      subject = factory('<a/>');
      target = subject.getTarget().html('x').append('y').prepend('z');

      expect(typeof(target)).toEqual('object');
    });

    it("returns the element", function () {
      $('body').append('<div id="container" />');

      var container = $('#container');
      subject = factory('<a data-target="#container">');

      expect(subject.getTarget()).toEqual(container);
    });
  });

  describe("#getTargetMethod()", function () {
    it("returns the target method", function () {
      expect(factory('<a />').getTargetMethod()).toEqual('html');
      expect(factory('<a data-target-method="append" />').getTargetMethod()).toEqual('append');

      subject = factory('<a data-target-method="append" />', { targetMethod: 'html' });
      expect(subject.getTargetMethod()).toEqual('html');
    });
  });
});
