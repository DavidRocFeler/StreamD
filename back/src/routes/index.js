const router = require("express").Router();
router.get("/", function (request, response) {
    response.status(200).send("hola mundo");
});


const getMoviesController = require("../controllers/index")
router.get("/movies", getMoviesController);

module.exports = router; 





