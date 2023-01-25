const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

//------------OBTENER LOS GENEROS DE LA API Y GUARDARLOS EN LA DB-----------
const getGenres = async ()=>{
    const apiInfo = await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiGenres = await apiInfo.data.results.map(elemento => elemento.name);
    
    apiGenres.forEach(genre=>{
        Genres.findOrCreate({
            where: { name: genre }
        });
    });
    const allGenres = await Genres.findAll()
    return allGenres;
};

module.exports = {
    getGenres
}