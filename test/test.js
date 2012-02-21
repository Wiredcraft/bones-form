var bones = require('bones');

require('bones-form');

var Backbone = bones.Backbone;

// Devel model and view;
var user = new Backbone.Model({
  name: 'Jackey',
  mail: 'jackey@wiredcraft.com'
});

console.log(bones.views);

//var loginForm = new bones.views.Com({
//  schema: {
//    name: {'class': 'TextField', attributes: {required: true, name: 'name'}, title: 'Name:'}},
//    mail: {'class': 'TextField', title: 'Email:', attributes: {name: 'mail'}
//  },
//  model: user,
//  title: 'Login Form'
//});
//
//exports.testCreateFormElement = function (bexit, assert) {
//  loginForm._initItems();
//  var items = loginForm._items;
//  assert.eql(items.length, 2);
//}