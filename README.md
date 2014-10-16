jQuery.remote
-----------------------

Eases the remote handling of links

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

- ```target``` - The place the response should be prepended/appended/placed. See ```targetMethod```
- ```targetMethod``` - html | prepend | append

### Installing

@TODO

### Issues/Features proposals

[Here](https://github.com/mjacobus/jQuery.remote/issues) is the issue tracker.

## Contributing

Please refer to the [contribuiting guide](https://github.com/mjacobus/jQuery.remote/blob/master/CONTRIBUTING.md).

### Lincense
[MIT](MIT-LICENSE)

### Authors

- [Marcelo Jacobus](https://github.com/mjacobus)
