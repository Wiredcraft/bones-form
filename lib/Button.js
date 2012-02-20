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

// Main Body of com.
function Button (options) {
  options || (options = {});
  Component.prototype.constructor.apply(this, arguments);
  return this;
}

_.extend(Button.prototype, Component.prototype, {
  tagName: 'input',
  attributes: {
    type: 'button',
    name: 'button',
    class: 'btn',
    value: 'button'
  },
  render: function (container, position) {
    this.container = this.el;
    return this;
  }
});

// Events handler.

// Export com.
if (onServer) {
  module.exports = Button;
}
else {
  window.Components.Button = Button;
}

