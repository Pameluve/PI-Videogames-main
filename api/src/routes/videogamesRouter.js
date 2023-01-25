const { Router } = require("express");
const { allVideogames, postGame } = require("../controllers/videogamesControllers");

const videogamesRouter = Router();

//---------------------------GET-------------------------------
videogamesRouter.get ("/", async (req, res)=>{
    const { name } = req.query
    const allGames = await allVideogames();
    try {
        if(name){
            let gameName = allGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
            if (gameName.length > 15) res.status(200).send(gameName.slice(0,15));
            else if (gameName.length > 0 && gameName.length < 15) res.status(200).send(gameName);
            else {
                res.status(404).send("The game does not exist");
            };
        }
        else{
            res.status(200).send(allGames);
        }
        
    } catch (error) {
        res.status(400).send ({error: error.message});
    }; 
});

videogamesRouter.get("/:id", async (req, res)=>{
    const { id } = req.params;
    const allGames = await allVideogames();
    try {
        if(id){
            let gameId = allGames.find(game => game.id === parseInt(id) || game.id === id);
            gameId? res.status(200).send(gameId): res.status(404).send("Id not found")
        }
    } catch (error) {
        res.status(400).send ({error: error.message});
    }
})

//---------------------------POST-------------------------------
videogamesRouter.post("/", async (req, res)=>{
    try {
        let { name, description, released, rating, platforms, image, createdInDB, genres} = req.body;
        
        if(!name || !description || !platforms){
            throw Error("Information missing");
        }
        if(!image) image = "https://i.pinimg.com/564x/f3/8c/03/f38c0360b434bb958d3973064fbeabc1.jpg";
        
        await postGame(name, description, released, rating, platforms, image, createdInDB, genres)
        res.status(200).send ("Videogame created successfully"); 
    }   
    catch (error) {
        res.status(404).send ({error: error.message});
    };
});

module.exports = videogamesRouter;
