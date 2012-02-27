var comM = Bones.server ? require('../lib/ComManager.js') : window.ComManager;

view = Backbone.View.extend();

view.prototype.initialize = function (options) {
    options || (options = {});
}

view.prototype.prerender = function () {
    var self = this;
    this.form = form = comM.create('Form', this.schema);
  
    // Set submit handler;
    if (this.onSubmit) {
        this.form.onSubmit = function (values) {
            return self.onSubmit.apply(self, arguments);
        };
    }
  
    // Set form validator.
    if (this.onValidate) {
        this.form.onValidate = function (values) {
            return self.onValidate.apply(self, arguments);
        }
    }
}

view.prototype.schema = {
  
    };

// There is a mapping rule for schema to model.
// Ex: 
// Schema: {'model_property', {class: 'Textfield', title: 'model property', help: '', markup: '',  attributes: {'name': 'model_property', 'class': 'some'}}}
// Model attributes: {model_property: property_value}
view.prototype.render = function () {
    var schema = this.schema ? this.schema.items : [];
    var model = this.model;
  
    // Set value from model.
    if (model) {
        for (var key in schema) {
            var valueSetter = schema[key]['value'];
            if (valueSetter) {
                valueSetter.call(this.form.getItem(key), model);
            }
            else {
                var data = model.get(key) ? model.get(key): '';
                this.form.getItem(key).setValue(data);
            }
        }
    }
    $(this.el).append(this.form.render().el);
    return this;
}

// Shoule be overrided by client.
view.prototype.onSubmit = function (json) {
  
    }

// Should be overrided by client.
view.prototype.onValidate = function (validate) {
  
    }
    
