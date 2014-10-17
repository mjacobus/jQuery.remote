jQuery.remote
-----------------------

A nice simple way to handle ajax requests

Code information:

[![Build Status](https://travis-ci.org/mjacobus/jQuery.remote.png?branch=master)](https://travis-ci.org/mjacobus/jQuery.remote)
[![Coverage Status](https://coveralls.io/repos/mjacobus/jQuery.remote/badge.png?branch=master)](https://coveralls.io/r/mjacobus/jQuery.remote?branch=master)
[![Code Climate](https://codeclimate.com/github/mjacobus/jQuery.remote.png)](https://codeclimate.com/github/mjacobus/jQuery.remote)

Package information:

[![Dependency Status](https://gemnasium.com/mjacobus/jQuery.remote.png)](https://gemnasium.com/mjacobus/jQuery.remote)

### Usage

Basic usage:

```javascript
$('a[data-remote]').remote();
```

Customizing:

```javascript
$('a[data-remote]').remote({
  success: function (response) {
    // handle response
    this.getTarget().append('<p>Response:</p>').append(response);
  }
});
```

### Options

Most options can be passed in the form of an object when instantiating the plugin or in the data-{opition} format:

- ```target``` - The place the response should be prepended/appended/placed. See ```targetMethod```
- ```targetMethod``` - html | prepend | append
- ```type``` - The type of request: IE: 'POST', 'GET'
- ```data``` - The data to be send in the request

Valid options:

```javascript

$('a').remote({
  data: { foo: 'bar' }
});

$('a').data('foo', 'bar').remote({
  data: function () {
    var foo = this.$element.data('foo');

    return { foo: value };
  }
});

```

### Installing

@TODO

### Issues/Features proposals

[Heres](https://github.com/mjacobus/jQuery.remote/issues) is the issue tracker.

## Contributing

Please refer to the [contribuiting guide](https://github.com/mjacobus/jQuery.remote/blob/master/CONTRIBUTING.md).

### Lincense
[MIT](MIT-LICENSE)

### Authors

- [Marcelo Jacobus](https://github.com/mjacobus)
