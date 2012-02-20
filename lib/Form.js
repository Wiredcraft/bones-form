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


/**
 * @params options {cls, action, method, accept, accept-charset, enctype, name, title}
 * reference: http://www.w3schools.com/tags/tag_form.asp
 */
function Form (options) {
  options || (options = {});
  Component.prototype.constructor.apply(this, arguments);
  if (options.items.length) this.items = options.items;
  this._initItems.call(this);
  
  var form = this;
  // Delegate event on button;
  $(this.el).delegate('input[type="submit"]', 'click', function () {
    form._submit.apply(form, arguments);
  });
  return this;
}

_.extend(Form.prototype, Component.prototype, {
  tagName: 'form',
  attributes: {
    'class': 'form-horizontal'
  },
  // Form can have many sub-item. 
  // Each item is Object that inherit from Component configuration.
  // Ex: [{
  //   'class': 'Button',
  //   'attributes': {'class': 'button', 'value': 'Save', 'name': 'save'},
  //   }, {
  //     'class': 'TextField',
  //     'attributes': {},
  //     'title': 'Name:',
  //     'markup': 'Please input your name'
  //   }
  // ]
  items: [],
  // This is the element of that crated from items by Form.
  _items: []
});

Form.prototype.render = function () {
  var el = this.container = this.el;
  // If has title.
  var field = null;
  if (this.title) {
    field = $('<fieldset><legend>'+this.title+'</legend></fieldset>');
  }
  //if (!el) this._getDom();
  var actionTmp = $('<div class="form-actions"></div>');
  if (this._items.length) {
    // We ignore the position now.
    // TODO later;
    //this._items.sort(function (i1, i2) {
    //  return i1.position - i2.position;
    //});
    _.each(this._items, function (com) {
      // Button has special region.
      if (com.attributes.type == 'button') {
        actionTmp.append(com.render().container);
      }
      else {
        field ? $(field).append(com.render().container) : $(el).append(com.render().container);
      }
    });
  }
  if (field) {
    field.append(actionTmp);
    $(el).append(field);
  }
  else $(el).append(actionTmp);
  
  this.rendered = true;
  return this;
}

Form.prototype._initItems = function () {
  if (this.items.length) {
   var self = this;
   _.each(this.items, function (item) {
     var com = comM.create(item['class'], item);
     // Add form reference in each sub-item.
     com.form = self;
     self._items.push(com);
   });
  }
  
  // We create only one button to catch default submit event.
  var submitBtn = comM.create('Button', {
    attributes: {
      'value': 'Submit',
      'type': 'submit',
      'name': 'submit'
    }
  });
  self._items.push(submitBtn);
  return this;
}

Form.prototype._submit = function () {
  
  var passed = true, items = this._items;
  
  // We should validate first time.
  for (var i = 0; i < items.length; i++) {
    var err = items[i].onValidate(this, items[i].getValue());
    if (err) {
      passed = false;
      break;
    }
  }
  return passed;
}

if (onServer) {
  module.exports = Form;
}
else {
  window.Components.Form = Form;
}