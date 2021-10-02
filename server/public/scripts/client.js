$ (document ).ready( onReady );

//globals
let genres = [];
let ratings = [];
let books = [];

function onReady() {
    //get the book genres
    getBooks();
    getBookGenres();
    getBookRatings();
}
function getBooks() {
    $.ajax({
        method: 'GET',
        url: '/books'
    }).then( function( response ) {
        //target the <ul> DOM element and add a list to it
        console.log( `response from GET /books is:`, response );
        let bookList = $( '#bookList' );
        bookList.empty();
        for ( let i = 0; i < response.length; i++ ) {
            //console.log( 'book title is:', response[i].title)
            bookList.append(
                 `<li data-id='${response[i].id}'>${response[i].title} by ${response[i].author}</li>`
            );
        }
    }).catch( function( err ){
        console.log( err );
        alert( 'oops' );
    })
}
function getBookGenres() {
//get genres from db and load <select> element with book genres
    $.ajax({
        method: 'GET',
        url: '/genres'
    }).then( function( response ){
        console.log( 'back from genres table with:', response );
        fillGenresList( response );
    }).catch( function( err ){
        console.log( err );
        alert( 'oops' );
    })
}
//get ratings from db and load <select> element with ratings
function getBookRatings() {
    $.ajax({
        method: 'GET',
        url: '/ratings'
    }).then( function( response ){
        console.log( 'back from ratings table with:', response );
        fillRatingsList( response );
    }).catch( function( err ) {
        console.log( err );
        alert( 'oops' );
    })
}
function fillGenresList( response ) {
    //target DOM <select> element for genres
    let elList = $( '#bookGenres' );
    elList.empty();
    for ( let i = 0; i < response.length; i ++ ) {
        elList.append(`<option data-id="${response[i].id}">${response[i].genre}</option> `)
    }
}
function fillRatingsList( response ) {
    //target DOM <select> element for genres
    let elList = $( '#bookRatings' );
    elList.empty();
    for ( let i = 0; i < response.length; i ++ ) {
        elList.append(`<option data-id="${response[i].id}">${response[i].rating}</option> `)
    }
}