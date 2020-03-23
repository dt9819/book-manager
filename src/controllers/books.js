'use strict';
const Books = require('./../services/books');

let modals, bookAdaptor;

class BooksController {
    constructor(modal) {
        bookAdaptor = new Books(modal);
        modals = modal;
    }

    //add books
    static async addBook(req) {
        try {
            return await bookAdaptor.addBooks(req);
        } catch(e){
            console.log(e);
        }
    }


    //modify books
    static async modifyBook(req) {
        try {
            return await bookAdaptor.modifyBooks(req);
        } catch(e){
            console.log(e);
        }
    }

    //get books
    static async getBook(req) {
        try {
            return await bookAdaptor.getBooks(req);
        } catch(e){
            console.log(e);
        }
    }

    //get all authors of a book
    static async getAllAuthors(req) {
        try {
            return await bookAdaptor.getAllData(req);
        } catch(e){
            console.log(e);
        }
    }

}

module.exports = BooksController;
