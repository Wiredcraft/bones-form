var onServer = (typeof require != 'undefined');
ComManager = function () {
  var coms = {};
  
  return {
    add: function (id, o) {
      if (arguments.length == 1) {
        o = id;
        id = o.id;
      }
      coms[id] = o;
    },
    remove: function (id) {
      delete coms[id];
    },
    get: function (id) {
      return coms[id];
    },
    coms: coms,
    isAdded: function (id) {
      return coms[id] ? true: false;
    },
    create: function (type, options) {
      if (!type) throw new Error('Don\'t have class for component');
      options || (options = {});
      if (!options.id) options.id = this.guid();
      return onServer ? new require('../lib/' + (type))(options) : new window.BonesForm[type](options);
    },
    guid: guid
  };
}();


if (onServer) {
  module.exports = ComManager;
}
else {
  window.ComManager = ComManager;
  window.BonesForm = {};
}

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}