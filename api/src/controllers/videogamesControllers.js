const axios = require("axios");
const { Videogames, Genres } = require("../db");
const { API_KEY } = process.env;


//------------OBTENER LOS PRIMEROS 100 VIDEOJUEGOS DE LA API-----------
const apiVideogames = async ()=>{
    let requests = [
        `https://api.rawg.io/api/games?key=${API_KEY}`,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2`,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3`,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=4`,
        `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    ]
 
    const apiAll = await Promise.all(requests.map(async e=> (await axios.get(e)).data.results)) // P.all resuelve el array de promesas (request)
    const apiInfo = apiAll.flat(1) // transformar varios arrays en uno solo

    const apiGames = apiInfo.map(element=>{
        return {
            id: element.id,
            name: element.name,
            image: element.background_image,
            genres: element.genres.map(element=>element.name),
            description:element.description? element.description : "Videojuego sin descripcion",
            released: element.released,
            rating: element.rating,
            platforms: element.platforms.map(element=>element.platform.name)
        };
    });
    console.log(apiGames.length)
    return apiGames;
};

//------------OBTENER LOS VIDEOJUEGOS DE LA DATA BASE-----------
const dbVideogames = async ()=>{
    const dbGames = await Videogames.findAll({
        include: {
            model: Genres,
            attributes: ["name"],
            through: { attributes:[] }
        }
    })
    const datos = dbGames.map(element =>{
        return {
            id: element.id,
            name: element.name,
            image: element.image,
            genres: element.Genres.map(element=>element.name),
            description:element.description,
            released: element.released,
            rating: element.rating,
            platforms: element.platforms.map(element=>element),
            createdInDB: element.createdInDB
        };
    })
    return datos;
};

//------------CONSOLIDAR TODOS LOS VIDEOJUEGOS (API Y DB)-----------
const allVideogames = async()=>{
    const apiGames = await apiVideogames();
    const dbGames = await dbVideogames();
    const response = [...apiGames, ...dbGames];
    return response;
};

//------------POST VIDEOGAMES-----------
const postGame = async(name, description, released, rating, platforms, image, createdInDB, genres)=>{
    let newGame = await Videogames.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDB
    });
    let dbGenre = await Genres.findAll({
        where: { name : genres}
    });
    await newGame.addGenres(dbGenre);
};

module.exports = {
    allVideogames,
    postGame
}