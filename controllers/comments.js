const bcrypt = require('bcrypt');
const joi = require('joi');
const {
  getCommentsFromPostById,
  createCommentFromPostById,
} = require('../db/commentsdb');

const newCommentInPostById = async (req, res) => {
  // Tengo que usar la función createCommentFromPostById
};

const showCommentFromPostById = async (req, res) => {
  // Tengo que usar la función getCommentFromUserById
};

module.exports = {
  newCommentInPostById,
  showCommentFromPostById,
};
