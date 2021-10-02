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
        fillList( response, 'bookGenres')
    }).catch( function( err ){
        console.log( err );
        alert( 'oops' );
    })
}
function getBookRatings() {
    $.ajax({
        method: 'GET',
        url: '/ratings'
    }).then( function( response ){
        console.log( 'back from ratings table with:', response );
    }).catch( function( err ) {
        console.log( err );
        alert( 'oops' );
    })
}
function fillList( response, targetElement ) {
    //target DOM <select> element for genres
    let elList = $( `#${targetElement}` );
    elList.empty();
    for ( let i = 0; i < response.length; i ++ ) {
        elList.append(`<option data-id="${response[i].id}">${response[i].genre}</option> `)
    }
}