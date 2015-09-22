define( function( require ) {
    return function( iComponent ) {
        var header = {},
            basket = iComponent;

        header.model = function() {
            this.title = m.prop('Mithril webshop');
            this.contacts = m.prop('Contacts');
        };

        header.controller = function() {
            var ctrl = this;
            this.headerModel = m.prop( new header.model() );
        };

        header.view = function( ctrl ) {
            var model = ctrl.headerModel();

            return m('div', { class: 'container-fluid' }, [
                m('div', { class: 'navbar-header' }, [
                    m('div',[
                        m('a',{ href:'/', class: 'navbar-brand' }, model.title())
                    ])
                ]),
                m('div', { class: 'navbar-collapse collapse' }, [
                    m.component( basket )
                ])
            ])
        };

        return header;
    };
});