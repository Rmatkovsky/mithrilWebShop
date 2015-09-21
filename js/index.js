require.config({
    baseUrl: '/js/',
    paths: {
        'mithril': 'libs/mithril'
    },
    deps:['init'],
    shim: {
        'mithril': {exports: 'mithril'}
    }
});
