const mongoose = require('mongoose');
const { Schema } = mongoose;


const movieSchema = new Schema({

  title: {
    type: String,
    required: [true, "title is requerid"]
  },
  director: {
    type: String,
    required: [true, "Director is requerid"]
  },
  duration: {
    type: String,
    required: [true, "Duration is requerid"]
  },
  rate: {
    type: Number,
    required: [true, "Rate is requerid"]
  },
  poster: {
    type: String,
    required: [true, "Banner is requerid"]
  },
  section: {
    type: String,
    required: [true, "Section is requerid"]
  },
  genre: {
    type: [String],
    required: [true, "Genre is requerid"]
  },
  year: {
    type: Number,
    required: [true, "Number is requerid"]
  },
  movieReview: {
    type: String,
    required: [true, "MoviewReview is requerid"]
  },
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;
