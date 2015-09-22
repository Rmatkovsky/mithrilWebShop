define( function( require ) {
    return function( iComponents ) {
        iComponents.basket      = require( 'components/basket' );
        iComponents.header      = require( 'components/header' )( iComponents.basket );
        iComponents.categories  = require( 'components/categories' );
        iComponents.products    = require( 'components/products' )( iComponents.basket );
        iComponents.productInfo = require( 'components/productInfo' )( iComponents.basket );
    };
});
