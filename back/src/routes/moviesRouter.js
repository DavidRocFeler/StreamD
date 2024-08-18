const router = require("express").Router()
const {getMovies, createMovies, getSectionStreamById, getTrailerByTitle} = require("../controllers/moviesController")

router.get("/movies/trailers", getTrailerByTitle)
router.get("/movies/:section", getSectionStreamById)
router.get("/movies", getMovies);
router.post("/movies", createMovies)


module.exports = router; 


