//requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );
//uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
//globals
const port = 5000;
//spin up the server
app.listen( port, ()=>{
    console.log( 'server is up on port:', port );
})

//do things via routes
//Get books from database
app.get( '/books', ( req, res )=>{
    const queryString = 'SELECT * FROM book_inventory';

    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})
//Get genres from database and load into list on screen
app.get( '/genres', ( req, res )=>{
    const queryString = 'SELECT * FROM book_genres';

    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );

    }).catch( ( err )=>{
        console.log( err);
        res.sendStatus( 500 );
    });
})
//Get ratings from database
app.get( '/ratings', ( req, res)=>{
    const queryString = 'SELECT * FROM ratings';

    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( (err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})
//Add book to book_inventory table in database
app.post( '/books', ( req, res )=>{
    console.log( `in post` );
    const queryString = `INSERT INTO book_inventory ( title, author, genre, rating )
    VALUES ( $1, $2, $3, $4 )`;
    //sanitize the data with array
    let values = [ req.body.title,
                   req.body.author,
                   req.body.genre,
                   req.body.rating 
                ];
                console.log( `values are:`, values );
// VALUES ( '${req.body.title}', '${req.body.author}', '${req.body.genre}', '${req.body.rating}' );`
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})