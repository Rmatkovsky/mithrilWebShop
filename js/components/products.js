define( function( require ) {
    return function( iComponent ) {
        var products = {},
            basket = new iComponent.controller();

        products.model = function( data ) {
            this.id = m.prop( data['_id'] );
            this.name = m.prop( data['name'] );
            this.price = m.prop( data['price'] );
        };

        products.model.list = function () {
            var categoryId = m.route.param('categoryId');

            return m.request({
                method: 'GET',
                url: 'http://localhost:8080/allproducts/' + categoryId,
                type: products.model
            });
        };

        products.controller = function() {
            this.products = products.model.list();

            this.addToCart = function( iModel ) {
                basket.add( iModel );
            };
        };

        products.view = function( ctrl ) {
            return [
                m('h2', { class: 'subheader'} ),
                m('div', { class: 'table-responsive' },[
                    m('table', { class: 'table table-striped' }, [
                        m('thead', [
                            m('tr',[
                                m('th', 'Name'),
                                m('th', 'Price'),
                                m('th', 'Buy this product')
                            ])
                        ]),
                        m('tbody',[
                            ctrl.products().map( function( item ) {
                                return m('tr',[
                                    m('td', [
                                        m('a', { href: '/productInfo/' + item.id(), config: m.route }, item.name() )
                                    ]),
                                    m('td', item.price() + '$'),
                                    m('td', [
                                        m('button', { onclick: ctrl.addToCart.bind( ctrl, item ), class: 'btn btn-success btn-xs' }, 'Buy')
                                    ])
                                ])
                            })
                        ])
                    ])
                ])
            ];
        };

        return products;
    };
});
