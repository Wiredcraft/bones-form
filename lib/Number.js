var _, $, Component, comM, onServer = (typeof require != 'undefined');

if (onServer) {
  var bones = require('bones');
  _ = bones._;
  $ = bones.$;
  TextField = require('./TextField');
  comM = require('./ComManager');
}
else {
  _ = window._;
  $ = window.$;
  TextField = window.BonesForm.TextField;
  comM = window.ComManager;
}

function Number(options) {
  options || (options = {});
  var attributes = this.attributes;
  if (options.attributes) {
    for (var a in options.attributes) {
      if (a == 'class') {
        attributes['class'] += options.attributes['class'];
      }
      else {
        attributes[a] = options.attributes[a];
      }
    }
  }
  delete options.attributes;
  _.extend(this, options);
}

_.extend(Number.prototype, TextField.prototype, {
  onValidate: function (value) {
    
  }
});

if (onServer) {
  module.exports = Number;
}
else {
  window['BonesForm']['Number'] = Number;
}