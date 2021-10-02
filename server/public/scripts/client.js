$ (document ).ready( onReady );

//globals
let genres = [];
let ratings = [];

function onReady() {
    //get the book genres
    getBookGenres();
    //getBookRatings();
}
function getBookGenres() {
//go to database and load <select> element with book genres
    $.ajax({
        method: 'GET',
        url: '/genres'
    }).then( function( response ){
        console.log( 'back from genres table with:', response );
        fillGenresList( response );
    }).catch( function( err ){
        console.log( err );
        alert( `oops` );
    })
}
function fillGenresList( response ) {
    //target DOM <select> element for genres
    let genres = $( '#bookGenres' );
    genres.empty();
    for ( let i = 0; i < response.length; i ++ ) {
        genres.append(`<option data-id="${response[i].id}">${response[i].genre}</option> `)
    }
}