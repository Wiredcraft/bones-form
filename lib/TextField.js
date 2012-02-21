var _, $, Component, comM, onServer = (typeof require != 'undefined');

if (onServer) {
  _ = require('underscore');
  $ = require('jquery');
  Component = require('./Component');
  comM = require('./ComManager');
}
else {
  _ = window._;
  $ = window.$;
  Component = window.Components.Component;
  comM = window.ComManager;
}

function TextField(options) {
  options || (options = {});
  this.attributes = {};
  this.validates = [];
  Component.prototype.constructor.apply(this, arguments);
  
  // We add default validate for field.
  // Default, textfield support validation is 
  // email, number
  if (options.email) {
    this.validates.push(this.validateEmail);
  }
  if (options.number) {
    this.validates.push(this.validateNumber);
  }
}

_.extend(TextField.prototype, Component.prototype, {
  tagName: 'input',
  render: function (container, position) {
    this._getDom();
    if (container) {
      container.append(this.el);
    }
    else {
      Component.prototype.render.apply(this, arguments);
    }
    return this;
  },
  getValue: function () {
    return $(this.el).val();
  },
  setValue: function (val) {
    $(this.el).val(val);
  },
  validateEmail: function (value) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  },
  validateNumber: function (value) {
    var numberPattern = /^[0-9]+$/;
    if (numberPattern.test(value) == false ) {
      return 'Please provide number!';
    }
  },
});

if (onServer) {
  module.exports = TextField;
}
else {
  window['Components']['TextField'] = TextField;
}