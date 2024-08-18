const { getAllMoviesService, createMoviesService, getSectionStreamByIdService, getTrailerByTtitleService } = require("../services/moviesService");

const getMovies = async (req, res) => {
    try {
        const movies = await getAllMoviesService();
        res.status(201).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error when bringing the movies', error });
    }
};

const getSectionStreamById = async (req, res) => {
    try {
        const section = req.params.section;
        console.log('Section:', section);
        const sectionStream = await getSectionStreamByIdService(section);
        res.status(201).json(sectionStream);
    } catch (error) {
        res.status(500).json({message: "Error when bringing the sections", error})
    }
}

const getTrailerByTitle = async (req, res) => {
    try {
        const title = req.query.title;
        if(!title) {
            return res.status(400).json({message:"failled with the title", error})
        }

        const trailer = await getTrailerByTtitleService(title);
        if(!trailer)
            return res.status(404).json({message:"trailer not found", error});

        res.status(201).json(trailer);
    } catch (error) {
        res.status(500).json({message:"catching error", error});
    }
}

const createMovies = async (req, res) => {
    try {  
        const newMovie = await createMoviesService(req.body);
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(500).json({message: "Error creating the movie", error});
    }
};

module.exports = { 
    getMovies, 
    createMovies, 
    getSectionStreamById,
    getTrailerByTitle
};

// module.exports = {
//     getAllMoviesController: async (req,res) => {
//         try {
//             const moviesArray = await getAllMoviesService();
//             res.json(moviesArray);
//         } catch (error) {
//             res.status(error.response.status).send(error.message);
//         }
//     },
// };

// async function getMoviesController (req, res) {
//     const response = await getMoviesServices();
//     res.send(response);
// };

// module.exports = getMoviesController;
