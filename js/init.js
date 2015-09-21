define( function( require, exports, module ) {
    "use strict";

    var m = require( 'mithril' );
    var components = {};

    require( 'configs/components' )( components );
    require( 'configs/routes')( components );
});
