var comM = Bones.server ? require('../lib/ComManager.js') : window.ComManager;

view = Backbone.View.extend();

views.prototype.initialize = function (options) {
  options || (options = {});
  this.schema = options.schema;
  this.model = options.model;
  var form = this.form = comM.create('Form', {
    title: options.title, 
    help: options.help, 
    markup: options.markup,
    attributes: {name: options.name, method: options.method || 'post'}
  });
}

// There is a mapping rule for schema to model.
// Ex: 
// Schema: {'model_property', {class: 'Textfield', title: 'model property', help: '', markup: '',  attributes: {'name': 'model_property', 'class': 'some'}}}
// Model attributes: {model_property: property_value}
views.prototype.render = function () {
  var schema = this.schema;
  var model = this.model;
  if (schema) {
    for (var p in schema) {
      // So that we should have same property name between schema and model.
      var data = model.get(p);
      var define = schema[p];
      if (data) define.attributes['value'] = data;
    }
    this.form.items = _.values(schema);
    this.form._initItems();
  }
  $(this.el).append(this.form.render().el);
}

views.prototype.onSubmit = function (json) {
  if (this.model) {
    this.model.set(json);
    this.model.save();
  }
}