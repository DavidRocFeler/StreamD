const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const movieSchema = new Schema({

  title: {
    type: String,
    required: [true, "title is required"]
  },
  director: {
    type: String,
    required: [true, "Director is required"]
  },
  duration: {
    type: String,
    required: [true, "Duration is required"]
  },
  rate: {
    type: Number,
    required: [true, "Rate is required"]
  },
  baner: {
    type: String,
    required: [true, "Banner is required"]
  },
  section: {
    type: String,
    required: [true, "Section is required"]
  },
  genre: {
    type: [String],
    required: [true, "Genre is required"]
  },
  year: {
    type: Number,
    required: [true, "Year is required"]
  },
  movieReview: {
    type: String,
    required: [true, "MoviewReview is required"]
  },
  trailers: {
    type: String,
    required: [true, "Trailer link is required"]
  }
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
