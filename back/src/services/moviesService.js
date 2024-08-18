const Movie = require("../models/movie");


  const getAllMoviesService = async () => {
    try {
      const movies = await Movie.find();
      return movies;
    } catch (error) {
      throw error;
    }
  }

  const getSectionStreamByIdService = async (sectionId) => {
    try {
      const movies = await Movie.find({section: sectionId})
      console.log(movies);
      return movies;
    } catch (error) {
      throw error;
    }
  }

  const getTrailerByTtitleService = async (title) => {
    try {
      const movies = await Movie.findOne({title:title}, "trailers");
      return movies ? movies.trailers : null;
    } catch (error) {
      throw error;
    }
  }

  
  const createMoviesService = async (movieData) => {
    try {
      const newMovie = new Movie(movieData);
      const savedMovie = await newMovie.save();
      return savedMovie;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    getAllMoviesService,
    createMoviesService,
    getSectionStreamByIdService,
    getTrailerByTtitleService
  }


// forma de exportar
// function movieService() {
//   return axios ("http://students-api.up.railway.app/movies")
//   .then((res) => {
//     return res.data
//   })
//   .catch((reason) => {
//     throw Error(reason)
//   })
// }



// function getMoviesServices () {
//   return axios("https://students-api.up.railway.app/movies")
//   .then(function(response) {
//       return response.data
//   }).catch (function(error) {
//       console.log(error.message);
//   })
// }

// module.exports = getMoviesServices;

// const Movie = require('../models/movie');

// const getMoviesService = async () => {
//   try {
//     const movies = await Movie.find();
//     return movies;
//   } catch (error) {
//     throw new Error('Error al obtener las películas');
//   }
// };

// module.exports = { getMoviesService };


// module.exports = {
//   movieService: async () => {
//     try {
//       const response = await axios ("http://students-api.up.railway.app/movies");
//       return response.data;
//     } catch (reason) {
//       throw Error(reason);
//     }
//   }
// }
