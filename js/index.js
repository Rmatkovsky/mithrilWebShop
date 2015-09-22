require.config({
    baseUrl: '/',
    paths: {
        'mithril': 'node_modules/mithril/mithril.min',
        'modules': 'node_modules',
        'configs':  'js/configs',
        'components': 'js/components'
    },
    deps:['js/init'],
    shim: {
        'mithril': {exports: 'mithril'}
    }
});
