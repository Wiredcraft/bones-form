s.model = options.model;
    this.schema.title = 'User Login';
    this.schema.help = 'Provide your correct account information to login system ';
    // we must call this to instance schema component..
    this.prerender(); 
}

  view.prototype.schema = {
   // items key name should same as model.
    items:  {
      name: {
        'class': 'TextField',
       validate: function (value) {// validate value when submit form. },
       value: function () {// you can provide value setter for form from model},
      }, mail: {
        'class': 'TextField',
       validate: function (value) {// validate value when submit form. },
       value: function () {// you can provide value setter for form from model},
      }
    }
  };
```javascript
