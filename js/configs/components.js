define( function( require ) {
    return function( iComponents ) {
        iComponents.header   = require( 'components/header' );
        iComponents.cart      = require( 'components/cart' );
        iComponents.products = require( 'components/products' );
        iComponents.main      = require( 'components/productInfo' );

        m.mount( document.getElementById('home-link'), iComponents.header );
    };
});
