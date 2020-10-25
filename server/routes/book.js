let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Book = require('../models/book');

/* GET Route for the Book List page - READ Operation */
router.get('/', (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('book/list', {title: 'Books', BookList: bookList});            
        }
    });
});

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
    res.render('book/add', {title: 'Add Book'})
});

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,   //change to title
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });
    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');            
        }
    });
});

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {title: "Edit Book", book: bookToEdit});            
        }
    });
});

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let = updateBook = Book({
        "_id": id,
        "name": req.body.name,   //change to title
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updateBook, (err) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');            
        }
    });
});

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');            
        }
    });
});

module.exports = router;