const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
  //#swagger.tags=['users']
  try {
    const result = await mongodb.getDb().collection('users').find();
    const users = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    const users = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  //#swagger.tags=['users']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      borrowedBooks: req.body.borrowedBooks || []
    };

    const response = await mongodb.getDb().collection('users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      throw new Error(response.error || 'Error al crear el usuario');
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  //#swagger.tags=['users']
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      borrowedBooks: req.body.borrowedBooks || []
    };

    const response = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      throw new Error(response.error || 'Error al actualizar el usuario');
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  //#swagger.tags=['users']
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      throw new Error(response.error || 'Error al eliminar el usuario');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAll, getSingle , createUser , updateUser , deleteUser
}