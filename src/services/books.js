const Sequelize = require('sequelize');

class BookService {
    constructor(modals) {
        this.modals = modals;
    }

    //add books
    async addBooks(req){
        let author = req.user.id;
        let { book_name } = req.body;
        let bookExist = await this.modals.books.findOne({where:{ name: book_name, author_id: author }});
        if (bookExist === null) {
            const books = await this.modals.books.create({
                name: book_name,
                author_id: author
            });
            return JSON.parse(JSON.stringify(books));
        }
        return 'Book already exists. Please Add Another';
    }

    //modify books
    async modifyBooks(req){
        let { book_name } = req.body;
        let { book_id } = req.params;
        let bookExist = await this.modals.books.findOne({where:{ id: book_id }});
        if (bookExist !== null) {
            const books = await this.modals.books.update({
                name: book_name
            },{ where:{ id: book_id }
            });
            return JSON.parse(JSON.stringify(books));
        }
        return 'Book does not exists.';
    }

    //get books
    async getBooks(req){
        let { book_id } = req.query;
        let books = await this.modals.books.findAll({
            where: { author_id: book_id }
        });
        if (books !== null) {
            return JSON.parse(JSON.stringify(books));
        }
        return 'Book does not exists';
    }

    //get all authors of a book
    async getAllData(req){
        let { book_name } = req.query;
        let authors = await this.modals.books.findAll( {
            attributes: [
                [this.modals.sequelize.literal(
                        '(select full_name from authors where authors.id = books.author_id)'),
                    'author_name']],
            where: { name: {[Sequelize.Op.iLike]: book_name} }
        });
        if (authors !== null) {
            return JSON.parse(JSON.stringify(authors));
        }
        return 'Book does not exists';
    }

}

module.exports = BookService;
