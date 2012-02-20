var path = require('path');
var fs = require('fs');
var connect = require('connect');
var env = process.env.NODE_ENV || 'development';

servers.Route.augment({
    initializeAssets: function(parent, app) {
        parent.call(this, app);
        this.assets.core = this.assets.core || [];
        var basePath = require.resolve('bones-form');
        var lib = path.join(path.dirname(basePath), 'lib/');
        
        // For now, we simple add lib one by one.
        this.assets.core.push(path.join(lib, 'ComManager.js'));
        this.assets.core.push(path.join(lib, 'Component.js'));
        this.assets.core.push(path.join(lib, 'Form.js'));
        this.assets.core.push(path.join(lib, 'Button.js'));
        this.assets.core.push(path.join(lib, 'Checkbox.js'));
        this.assets.core.push(path.join(lib, 'TextField.js'));
        this.assets.core.push(path.join(lib, 'Radio.js'));
        
        
        this.use('/bootstrap', connect.middleware.static(
          path.join(lib, 'bootstrap'), {
            maxAge: env === 'production' ? 3600 * 1000 : 0 // 1 hour.
          }
          ));
    }
});