const express = require('express');
const router = express.Router();

// Load Models
const Book = require('../../models/Book');
const User = require('../../models/User');

// @route   GET api/books?skip=3&limit=2&order=asc
// @desc    Get books
// @access  Public
router.get('/', (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  Book.find({})
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

// @route   GET api/books/:id
// @desc    Get book by id
// @access  Public
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

// @route   POST api/books
// @desc    Create a book
// @access  Private
router.post('/', (req, res) => {
  const newBook = new Book(req.body);
  newBook.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      bookId: doc._id
    });
  });
});

// @route   POST api/books/edit_book/
// @desc    Edit a book
// @access  Private
router.post('/edit_book', (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    });
  });
});

// @route   GET api/books/book_reviewer/:id
// @desc    GET a book_reviewer by id
// @access  Public
router.get('/book_reviewer/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      name: doc.name,
      lastname: doc.lastname
    });
  });
});

// @route   GET api/books/user_books/:id
// @desc    GET books related to a owner_id
// @access  Private
router.get('/user_books/:id', (req, res) => {
  let id = req.params.id;
  Book.find({ ownerId: id }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});

// @route   DELETE api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});

module.exports = router;
