const { Router } = require("express");
const { Genres } = require("../db");
const { getGenres } = require("../controllers/genresControllers");

const genresRouter = Router();

//---------------------------GET-------------------------------
genresRouter.get("/", async (req, res)=>{
    try {
        const allGenres = await getGenres();
        res.status(200).send(allGenres);       
    } catch (error) {
        res.status(400).send ({error: error.message});
    }
});


module.exports = genresRouter;