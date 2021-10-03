$ (document ).ready( onReady );

//globals
let books = [];

function onReady() {
    //get the book genres
    getBooks();
    getBookGenres();
    getBookRatings();
    $( '#addBookButton' ).on( 'click', addBook );
}
function getBooks() {
    $.ajax({
        method: 'GET',
        url: '/books'
    }).then( function( response ) {
        //target the <ul> DOM element and add a list to it
        let bookList = $( '#bookList' );
        bookList.empty();
        for ( let i = 0; i < response.length; i++ ) {
            //console.log( 'book title is:', response[i].title)
            bookList.append(
                 `<li data-id='${response[i].id}'>${response[i].title} by ${response[i].author}
                 <button>Remove</button></li>`
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
        fillRatingsList( response );
    }).catch( function( err ) {
        console.log( err );
        alert( 'error getting books' );
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
function addBook() {
    let objectToSend = {
        title: $( '#bookTitle' ).val(),
        author: $( '#bookAuthor' ).val(),
        genre: $( '#bookGenres' ).val(),
        rating: $( '#bookRatings' ).val()
    }
    console.log( `in addBook and objectToSend is:`, objectToSend );
    //send the book object to the DB
    $.ajax({
        method: 'POST',
        url: '/books',
        data: objectToSend
    }).then( function( response ){
        //update the DOM
        getBooks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error adding book' );
    })
}
//delete book from books_inventory on database