const express = require('express');
const router = express.Router();

// Load Book Model
const Book = require('../../models/Book');

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
