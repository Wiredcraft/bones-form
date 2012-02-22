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
  Component = window.BonesForm.Component;
  comM = window.ComManager;
}

function Radio(options) {
  options || (options = {});
  Component.prototype.constructor.apply(this, arguments);
  if (options.options) this.options = options.options;
  this._getDom();
  return this;
}

_.extend(Radio.prototype, Component.prototype, {
  tagName: 'input',
  attributes: {
    'type': 'radio',
    'name': 'radio'
  },
  // Options: {label: value};
  // Ex: {'Accep newsletter': 'true'}
  'options': {},
  // Override super class _getDom() function
  // for our special case.
  _getDom:  function () {
    var el = this.el = $('<div></div>');
    for (var o in this.options) {
      var attributes = _.extend({}, this.attributes);
      attributes['value'] = this.options[o];
      var input = this.make(this.tagName, attributes);
      var option = $('<label class="radio"></label>').append(input).append(o);
      $(el).append(option);
    }
    this.el = $(this.el).html();
    return this;
  },
  getValue: function () {
    // empty
  },
  setValue: function () {
    // emtpy
  }
});


if (onServer) {
  module.exports = Radio;
}
else {
  window['BonesForm']['Radio'] = Radio;
}