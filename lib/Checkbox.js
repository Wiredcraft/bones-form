var _, $, Component, comM, onServer = (typeof require != 'undefined');

if (onServer) {
  var bones = require('bones');
  _ = bones._;
  $ = bones.$;
  Component = require('./Component');
  comM = require('./ComManager');
}
else {
  _ = window._;
  $ = window.$;
  Component = window.BonesForm.Component;
  comM = window.ComManager;
}

function Checkbox(options) {
  options || (options = {});
  Component.prototype.constructor.apply(this, arguments);
  if (options.options) this.options = options.options;
  this._getDom();
//  $('input', this.el).bind('click', function () {
//    console.log($(this).attr('checked'));
//  });
  return this;
}

_.extend(Checkbox.prototype, Component.prototype, {
  tagName: 'input',
  attributes: {
    'type': 'checkbox',
    'name': 'checkbox'
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
      var option = $('<label class="checkbox"></label>').append(input).append(o);
      $(el).append(option);
    }
    return this;
  },
  getValue: function () {
    var vals = [];
    $('input:checked', this.el).each(function () {
      vals.push($(this).val());
    });
    return vals;
  },
  setValue: function () {
    
  }
});


if (onServer) {
  module.exports = Checkbox;
}
else {
  window['BonesForm']['Checkbox'] = Checkbox;
}