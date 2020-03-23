'use strict';
const Success = require('./../utils/success');
const Controller = require('./../controllers/books');
const auth = require('../middleware/verifyToken');

module.exports = (router, modals) => {

    const varController = new Controller(modals);
    if (varController) {

        //add books
        router.post('/books', auth, async (req, res) => {
            try {
                const data = await Controller.addBook(req);
                return Success.send(req, res, 200, data);
            } catch (e) {
                console.log(e);
                return Success.send(req, res, 200, []);
            }
        });

        //edit books
        router.put('/:book_id/books', auth, async (req, res) => {
            try {
                const data = await Controller.modifyBook(req);
                return Success.send(req, res, 200, data);
            } catch (e) {
                console.log(e);
                return Success.send(req, res, 200, []);
            }
        });

        //get books by author_id
        router.get('/books', auth, async (req, res) => {
            try {
                const data = await Controller.getBook(req);
                return Success.send(req, res, 200, data);
            } catch (e) {
                console.log(e);
                return Success.send(req, res, 200, []);
            }
        });

        //get all authors of a book
        router.get('/books/authors', auth, async (req, res) => {
            try {
                const data = await Controller.getAllAuthors(req);
                return Success.send(req, res, 200, data);
            } catch (e) {
                console.log(e);
                return Success.send(req, res, 200, []);
            }
        });
    }
};

