define( function( require ) {
    return function( iComponent ) {
        var product = {},
            basket = new iComponent.controller();

        product.model = function( data ) {
            this.id = m.prop( data['_id'] );
            this.name = m.prop( data['name'] );
            this.description = m.prop( data['description'] );
            this.price = m.prop( data['price'] );
            this.img = m.prop( data['img'] );
        };

        product.controller = function() {
            var productId = m.route.param('productId');

            if( !productId ) {
                return false;
            };

            this.productInfo = m.request({
                method: 'GET',
                url: 'http://localhost:8080/product/' + productId,
                type: product.model
            });

            this.addToCart = function( iModel ) {
                basket.add( iModel );
            };

        };

        product.view = function( ctrl ) {
            var product = ctrl.productInfo();
            return [
                m('div', { class: 'row' }, [
                    m('div', { class: 'col-xs-12' }, [
                        m('h1', ctrl.productInfo().name())
                    ])
                ]),
                m('div', { class: 'row' }, [
                    m('div', { class: 'col-xs-12 col-sm-12 col-md-7 col-lg-6' }, [
                        m('img', { src: product.img(), style: 'height: 400px; display: block;' }),
                        m('div', { class: 'clearfix', style: 'margin:10px' }),
                        m('div', { class: 'row' }, [
                            m('div', { class: 'col-xs-2' }, [
                                m('div', { class: 'h2' }, product.price() + '$' )
                            ]),
                            m('div', { class: 'col-xs-4' }, [
                                m('div', { class: 'h2' }, [
                                    m('button', { onclick: ctrl.addToCart.bind( ctrl, product ), type: 'button', class: 'btn btn-lg btn-success' }, 'Buy')
                                ])
                            ])
                        ])
                    ]),
                    m('div', { class: 'col-xs-12 col-sm-12 col-md-5 col-lg-6' },[
                        m('p', product.description() )
                    ])
                ])
            ];
        };

        return product;
    };
});
