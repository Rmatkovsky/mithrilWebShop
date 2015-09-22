var express = require('express'),
    cors = require('cors'),
    app = express(),
    MongoClient = require('mongodb').MongoClient;

app.use(cors());

MongoClient.connect('mongodb://localhost:27017/webshop', function(err, db) {
    if (err) throw err;

    app.get('/categories', function ( req, res ) {
        db.collection('categories').find().toArray( function( err, doc ) {
            if( err ) throw err;

            return res.status(200).send(doc);
        })
    });

    app.get('/allproducts/:categoryId', function( req, res ) {
        if( !req.params.categoryId ) return false;
        var categoryId = parseInt( req.params.categoryId );

        db.collection('products').find( { 'categoryId': categoryId } ).sort({'price':1}).toArray( function( err, doc ) {
            if( err ) throw err;

            return res.status(200).send(doc);
        })
    });

    app.get('/product/:id', function( req, res ) {
        if( !req.params.id ) return false;
        var productId = parseInt( req.params.id );

        db.collection('products').findOne( { '_id': productId }, function( err, doc ) {
            if( err ) throw err;

            return res.status(200).send(doc);
        })
    });

    app.get('*', function (req, res) {
        return res.status(404).send('Page Not Found');
    });

    app.listen(8080);
    console.log('Express server started on port 8080');
});
