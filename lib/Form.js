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


/**
 * @params options {cls, action, method, accept, accept-charset, enctype, name, title}
 * reference: http://www.w3schools.com/tags/tag_form.asp
 */
function Form (options) {
    options || (options = {});
    Component.prototype.constructor.apply(this, arguments);
    if (options.items) this.items = options.items;
    this._initItems.call(this);
  
    var form = this;
    // Delegate event on button;
    $(this.el).delegate('input[type="submit"]', 'click', function () {
        form._submit.apply(form, arguments);
        return false;
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
            if (com.attributes.type == 'button' || com.attributes.type == 'submit') {
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
  
    if (this.help) {
        field.append(this.help);
    }
  
    this.rendered = true;
    return this;
}

Form.prototype.setValue = function (data) {
    for (var key in data) {
        var subItem = this.getItem(key);
        if (subItem) subItem.setValue(data[key]);
    }
}

Form.prototype._initItems = function () {
    if (this.items) {
        var self = this;
        for (var name in this.items) {
            var item = this.items[name];
            item.attributes || (item.attributes = {});
            item.attributes.name = name;
            item.attributes.required = item.required ? true: false;
            item.title || (item.title = name);
            var com = comM.create(item['class'], item);
            // Add form reference in each sub-item.
            com.form = self;
            self._items.push(com);
        }
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

// Get item of component object from its name property or ID property;
// @param key item name or id;
Form.prototype.getItem = function (key) {
    if (this._items.length) {
        for (var i = 0; i < this._items.length; i++) {
            //console.log(this._items[i]);
            if (this._items[i].attributes.name == key || this._items[i].attributes.id == key) {
                return this._items[i];
            }
        }
    }
}

// When click submit, we do:
// 1. validate all field and component onValidate().
//    If found error, we stop validate and return error to UI.
// 2. Call onSubmit() on Form object and pass values into.
Form.prototype._submit = function () {
  
    // 1. Validate field validator.
    var items = this._items;
    var hasErr = false;
    if (items.length) {
        _.each(items, function (item) {
            var err = '';
            if (item.validate) {
                try {
                    err = item.validate();
                }
                catch (e) {
                //err = e
                }
            }
            if (err) {
                item.setError(err);
                hasErr = true;
            }
        });
    }
    // 2. Validate form validator.
    var err = this.onValidate(this.toJSON());
    if (err) hasErr = true;
    //if (err) form.setError(err);
  
    // 3. Submit form.
    if (!hasErr) {
        this.onSubmit(this.toJSON());
    }
}

Form.prototype.toJSON = function () {
    var json = {};
    _.each(this._items, function (item) {
        json[item['name']] = item.getValue();
    });
    return json;
}

// @options: {success, error, data}
Form.prototype.ajax = function (options) {
    var data = {};
    data['bones.token'] = Backbone.csrf('/form');
    if (options.data) {
        _.extend(options.data, data);
    }
    var params = {
        url:          '/form', // fixed.
        type:         'POST', // Fixed.
        contentType:  'application/json',
        dataType:     'json',
        processData:  false,
        success:      function (data, status) {
            console.log(data);
        },
        error: function () {
            console.log('error');
        }
    };
    options.data = JSON.stringify(options.data);
    _.extend(params, options);
    
    $.ajax(params);
}

if (onServer) {
    module.exports = Form;
}
else {
    window.BonesForm.Form = Form;
}