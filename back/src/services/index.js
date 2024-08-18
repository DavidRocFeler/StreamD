const Movie = require("../models/movie");

module.exports = { 
  getAllMoviesService: async () => {
    try {
      return await Movie.find()
    } catch (error) {
      throw error;
    }
  },
};




