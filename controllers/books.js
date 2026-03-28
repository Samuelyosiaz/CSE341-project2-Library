const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['books']
    try {
  const result = await mongodb.getDb().collection('book').find();
  const books = await result.toArray();
  res.status(200).json(books);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['books']
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('book').find({ _id: bookId });
    const books = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0]);
  } catch (error) {
    next(error); // delega al middleware de error
  }
};


const createBook = async (req, res, next) => {
  //#swagger.tags=['books']
  try {
    const contact = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
      gender: req.body.gender,
      editorial: req.body.editorial,
      pages: req.body.pages,
      available: req.body.available
    };

    const response = await mongodb.getDb().collection('book').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Book created successfully' });
    } else {
      throw new Error(response.error || 'Error al crear el libro');
    }
  } catch (error) {
    next(error);
  }
};


const updateBook = async (req, res, next) => {
  //#swagger.tags=['book']
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
      gender: req.body.gender,
      editorial: req.body.editorial,
      pages: req.body.pages,
      available: req.body.available
    };

    const response = await mongodb.getDb().collection('book').replaceOne({ _id: bookId }, book);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      throw new Error(response.error || 'Error al actualizar el libro');
    }
  } catch (error) {
    next(error);
  }
};


const deleteBook = async (req, res, next) => {
  //#swagger.tags=['book']
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('book').deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      throw new Error(response.error || 'Error al eliminar el libro');
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAll, getSingle , createBook , updateBook , deleteBook
}