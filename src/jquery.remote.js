var jQueryRemote = function (jQuery, $element, options) {
  this.$ = jQuery;
  this.$element = $element;
  this.options = options || {};
};

jQueryRemote.prototype = {

  /**
   * Get the options for the ajax request
   * @return object
   */
  getOptions: function () {
    var self = this;

    return {
      complete: self.success.bind(self),
      url: self.getUrl(),
      type: self.getType(),
      data: self.getData()
    };
  },

  /**
   * Default callback for the ajax response
   * @param response callback
   */
  success: function (response) {
    var method = this.$element.data('targetMethod') || 'html';
    var target = this.getTarget();
    target[method].call(target, response.responseText);
  },

  /**
   * Get the url for the request
   * @return string
   */
  getUrl: function () {
    return this.options.url || this.$element.attr('href') || this.$element.attr('action') || "";
  },

  /**
   * The request method
   * @return string
   */
  getType: function () {
    var method = this.options.type;

    method = method || this.$element.data('method');
    method = method || this.$element.attr('method');
    method = method || 'GET';

    return method.toUpperCase();
  },

  /**
   * Get the target method for handling the response
   * Accepted: html (default), append, prepend
   * @return string
   */
  getTargetMethod: function () {
    return this.options.targetMethod || this.$element.data('targetMethod') || 'html';
  },

  /**
   * Get the data to send along with the ajax request
   * @return object
   */
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

  /**
   * Get the target for putting the response in
   * @return jQuery
   */
  getTarget: function () {
    return this.$(this.$element.data('target'));
  },

  /**
   * Execute the ajax request
   * @return void
   */
  execute: function () {
    $.ajax(this.getOptions());
  }
};

/**
 * Create a remote request and executes it
 * @param function jQuery the jquery lib
 * @param jQuery element
 * @param object options the options
 */
jQueryRemote.factory = function (jQuery, element, options) {
  var request = new jQueryRemote(jQuery, element, options);

  return request.execute();
};

/**
 * Creates the jquery plugin
 * @param function jQuery the jquery lib
 * @param function the jQueryRemote function
 */
(function ($, jQueryRemote) {
  $.fn.remote = function (options) {
    var remoteCallback = function (e) {
      e.preventDefault();

      // prevent ajax on form click
      if ((e.type === 'click' && this.tagName === 'FORM')) {
        return;
      }

      jQueryRemote.factory($, $(this), options);
    };

    return this.on('click', remoteCallback)
      .on('remote', remoteCallback)
      .on('submit', remoteCallback);
  };
})(jQuery, jQueryRemote);
