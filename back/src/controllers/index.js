const { getAllMoviesService } = require("../services/index");
 
module.exports = {
    getAllMoviesController: async (req,res) => {
        try {
            const moviesArray = await getAllMoviesService();
            res.json(moviesArray);
        } catch (error) {
            res.status(error.response.status).send(error.message);
        }
    },
};

