define( function( require ) {

    var categories = {};

    categories.model = function( data ) {
        this.id = m.prop(data['_id']);
        this.name = m.prop(data['name']);
    };

    categories.model.list = function () {
        return m.request({
            method: 'GET',
            url: 'http://localhost:8080/categories',
            type: categories.model
        });
    };

    categories.controller = function() {
        this.categories = categories.model.list();
    };

    categories.view = function( ctrl ) {
        if( !ctrl.categories() ) {
            return false;
        };

        var selectedCategory = m.route.param('categoryId');

        return m('ul', { class: 'nav nav-sidebar'}, [
            ctrl.categories().map( function( item ) {
                return m('li',{ class: (item.id() == selectedCategory) ? 'active' : 'none'}, [
                    m('a',{ href: '/category/'+ item.id(), config: m.route }, item.name())
                ])
            })

        ]);
    };

    return categories;
});
