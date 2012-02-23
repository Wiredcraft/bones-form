// Whole Components used form-horizonal style of form that
// is supported by bootstrap. 
// Check [here](http://twitter.github.com/bootstrap/base-css.html#forms) 
// For more information of style.

var onServer = (typeof require != 'undefined');

var _, $, comM;
if (onServer) {
    var bones = require('bones');
    _ = bones._;
    $ = bones.$;
    comM = require('./ComManager');
}
else {
    _ = window._;
    $ = window.$;
    comM = window.ComManager;
}

/**
 *Component support properties are:
 * with render:
 * The lable for component
 * @title
 * The description or some error message for component.
 * @markup  
 * The component tag attributes, such as class, type, label.
 * @attributes 
 * Fom validate:
 * Would be called when submit form. Should return true or false when finished validate.
 * // validate output should return err if an error accured;
 * @validate 
 * with events handle:
 * Would be called when submit form. you can process value and return it to form object.
 * @submit
 */
function Component(options) {
    options || (options = {});
    if (options.validate) {
        this.validate = options.validate;
    }
  
    // Override defaults attributes.
    var attributes = this.attributes;
    if (options.attributes && options.attributes['class']) {
        attributes['class'] += " " + options.attributes['class'];
        delete options.attributes['class'];
    }
    _.extend(attributes, options.attributes);
  
    // Override something else.
    options.title && (this.title = options.title);
    options.markup && (this.markup = options.markup);
    options.help && (this.help = options.help);
    options.id && (this.id = options.id);
    this._getDom();
  
    this.initialize.apply(this, arguments);
  
    return this;
}

_.extend(Component.prototype, {
    // Which form is that current belongs to.
    form: null,
    id: '',
    parent: null,
    el: null,
    tagName: 'div',
    attributes: {},
    // Required by bootstrap html css.
    title: '',
    markup: '',
    help: '',
    container: '',
    // If rendered, this value will be set with true. 
    // Default false.
    rendered: false,
    initialize: function (options) {
    // empty;
    },
    submit: function () {
    // empty
    },
    render: function (container, position) {
        var container = this.container = $('<div class="control-group"></div>');
      
        // Append our label first time if need.
        if (this.title.toString().length) {
            $(container).append('<label class="control-label" for="'+this.attributes.name+'">'+this.title+'</label>');
        }
        $(container).append('<div class="controls"></div>');
        $('div.controls', container).append(this.el);
        //if (this.markup.toString().length) {
        $('div.controls', container).append('<label class="help-inline">'+this.markup+'</label>');
        //}
        if (this.help.toString().length) {
            $('div.controls', container).append('<label class="help-block">'+this.help+'</label>');
        }
        return this;
    },
    make: function (tagName, attributes,content) {
        var el = $('<' + tagName + '>');
        if (attributes) $(el).attr(attributes);
        if (content) $(el).html(content);
        return el;
    },
    _getDom: function () {
        if (!this.el) this.el = this.make(this.tagName, this.attributes);
        return this;
    },
    setError: function (err) {
        err || (err = " Please correct error!");
        $('.help-inline', this.container).html(err);
        $(this.container).addClass('error');
        return this;
    },
    getError: function () {
        return this.err;
    },
    getValue: function () {
        return $(this.tagName, this.el).val();
    },
    setValue: function (val) {
        $(this.tagName, this.el).val(val);
        return this;
    },
    onValidate: function (form, value) {
      
    },
    onSubmit: function () {
    // Empty.
    }
});

if (onServer) {
    module.exports = Component;
}
else {
    window.BonesForm.Component = Component;
}





