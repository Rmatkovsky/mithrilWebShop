define( function( require ) {
    var basket = {};

    basket.isOpen = false;

    basket.model = function( data ) {
        this.id = m.prop( data.id() )
        this.price = m.prop( data.price() );
        this.name = m.prop( data.name() )
    };

    basket.listItems = [];

    basket.controller = function() {
        this.add = function( iModel ) {

            if( !iModel ) {
                return false;
            };

            basket.listItems.push( new basket.model( iModel ) );
            basket.isOpen = true;
        };

        this.toggle = function() {
            basket.isOpen = !basket.isOpen;
        }
    };

    basket.listBoughtItems = function () {
        var total = 0;
        if( basket.listItems.length ) {
            return m('ul', { class: 'dropdown-menu', style: 'width: 348px; padding-left: 5px;' }, [
                    basket.listItems.map( function( item, index ) {
                        total += ~~item.price();
                        return m('li', [
                            m('span',[
                                m('span','  ' + ( index + 1 ) + '. '),
                                m('a', { href: '/productInfo/' + item.id(), config: m.route }, item.name() )
                            ], ' | ' + item.price() + '$')
                        ]);
                    }),
                    ( basket.listItems.length ) ? m('li', { class: 'divider' }): '',
                    m('li',[
                        m('a', 'Total: ' + total + ' $')
                    ])
            ]);
        };
    };

    basket.view = function( ctrl ) {
        return m('ul', { class: 'nav navbar-nav navbar-right' }, [
                m('li', { class: ( basket.isOpen) ? 'open': '' }, [
                    m('a', { onclick: ctrl.toggle, href:'#', class: 'dropdown-toggle' }, 'Basket', [
                        m('span', { class: 'caret' })
                    ]),
                    basket.listBoughtItems()
                ])
        ]);
    };

    return basket;
});
