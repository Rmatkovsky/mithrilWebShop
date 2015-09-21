define( function( require ) {
    return function( iComponent ) {
        iComponent.model = function() {
            this.title = m.prop('Mithril webshop');
            this.cartTitle = m.prop('Cart');
            this.contacts = m.prop('Contacts');
        };

        iComponent.controller = function() {
            var ctrl = this;

            this.model = m.prop( [new iComponent.model()] );
        };

        iComponent.view = function( ctrl ) {
            return m('.navbar-header', [
                    m('#home-link',[
                        m('a',ctrl.model.title())
                    ]),
                    m('#shopping-cart', [
                        m('a', ctrl.model.cartTitle())
                    ])
            ]);
        };
    };
});
