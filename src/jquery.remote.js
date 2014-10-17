var jQueryRemote = function (jQuery, $element, options) {
  this.$ = jQuery;
  this.$element = $element;
  this.options = options || {};
};

jQueryRemote.prototype = {

  getOptions: function () {
    var self = this;

    return {
      complete: self.success.bind(self),
      url: self.getUrl(),
      type: self.getType(),
      data: self.getData()
    };
  },

  success: function (response) {
    var method = this.$element.data('targetMethod') || 'html';
    var target = this.$(this.$element.data('target'));
    target[method].call(target, response.responseText);
  },

  getUrl: function () {
    return this.$element.attr('href') || this.$element.attr('action');
  },

  getType: function () {
    var method = this.$element.data('method');
    method = method || this.$element.attr('method');
    method = method || 'GET';

    return method.toUpperCase();
  },

  getData: function () {
    if (this.options.data) {
      if (typeof(this.options.data) === 'function') {
        return this.options.data.call(this);
      }

      return this.options.data;
    }

    if (this.$element[0].tagName.toUpperCase() === 'FORM') {
      return this.$element.serialize();
    }

    return {};
  },

  execute: function () {
    $.ajax(this.getOptions());
  }


};

jQueryRemote.factory = function (jQuery, element, options) {
  var request = new jQueryRemote(jQuery, element, options);

  return request.execute();
};

(function ($, jQueryRemote) {
  $.fn.remote = function (options) {

    return this.each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();

        jQueryRemote.factory($, $(this), options);


        // jQueryRemote.makeRequest($, $(this), options);
      });
    });
  };

})(jQuery, jQueryRemote);
