(function ($) {
  $.fn.remote = function () {

    return this.each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();

        var element = $(this);
        var url = element.attr('href');
        var target = $(element.data('target'));
        var method = element.data('targetMethod') || 'html';
        var options = {
          url: url,
          complete: function (response) {
            target[method].call(target, response.responseText);
          }
        };
        $.ajax(options);

        // jQueryRemote.makeRequest($, $(this), options);
      });
    });
  };

})(jQuery);
