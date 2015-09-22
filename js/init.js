define( function( require, exports, module ) {
    "use strict";

    function app() {

        this.components = {};

        this.init = function() {
            var m = require( 'mithril'),
                url = 'http://localhost:8080/',
                routes = {};

            require( 'configs/components' )( this.components );
            require( 'configs/routes')( this.components );

            routes = {
                '/': this,
                '/category/:categoryId': this.components.products,
                '/productInfo/:productId': this.components.productInfo,
                '/cart': this.components.basket
            };

            m.route( document.getElementById('content'), "/", routes );

            m.mount( document.getElementById('header'),  this.components.header );
            m.mount( document.getElementById('navigation'), this.components.categories );

        };

        this.view = function(){
            return m('h2', { class: 'subheader' }, 'Hello to mithril!');
        };
    };

    new app().init();
});
