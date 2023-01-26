import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postGame } from "../redux/actions";
import './styles/createVideogame.css'

//---------------------------VALIDATOR-------------------------------
const validation = (input) =>{
    const errors = {};
    if(!input.name){
        errors.name = "Nombre requerido";
    }
    if(!input.description){
        errors.description = "Descripcion requerida"
    }
    if(input.rating < 1 || input.rating > 5){
        errors.rating = "Rating valido requerido, numero entre 1 - 5"
    }
    if(!input.genres.length){
        errors.genres = "Al menos 1 genero debe ser seleccionado"
    }
    if(!input.platforms.length){
        errors.platforms = "Al menos 1 plataforma debe ser seleccionada"
    }
    return errors;
};

//---------------------------FORM-------------------------------
const CreateVideogame = ()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state)=>state.genres)
    const [ errors, setErrors ] = useState({})
    const [input, setInput] = useState({
        name:"",
        description:"",
        released:"",
        rating:0,
        image:"",
        genres:[],
        platforms:[]
    })

    useEffect(()=>{
        dispatch(getGenres())
    }, [dispatch]);

//---------------------------FORM SUBMIT HANDLER-------------------------------
    const submitHandler = (event)=>{
        event.preventDefault();
        setErrors(validation(input))
        if(!input.name || !input.description || ! input.platforms.length){
            return alert('Por favor, completar todos los campos')
        } 
        dispatch(postGame(input))
        alert("Videojuego creado con exito")
        setInput({
            name:"",
            description:"",
            released:"",
            rating:0,
            image:"",
            genres:[],
            platforms:[]
        })
        history.push("/createVideogame")
    }

//---------------------------INPUTS HANDLER-------------------------------
    const changeHandler = (event)=>{
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }));
    }

//---------------------------SELECT HANDLERS-------------------------------
    const genreSelectHandler = (event)=>{
        setInput({
            ...input,
            genres: [...input.genres, event.target.value]
        })
    }

    const platformSelectHandler = (event)=>{
        setInput({
            ...input,
            platforms: [...input.platforms, event.target.value]
        })
    }

    return(
        <div className="formBackground">
            <Link to = "/home">
                <button id="formReturnButton" >Volver</button>
            </Link>
            <form className="formContainer" onSubmit={(event)=>submitHandler(event)}>
                <h1>Crea tu propio Videojuego</h1>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={(event)=>changeHandler(event)}/>
                    {errors.name && (<h5>{errors.name}</h5>)}
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={input.description} name="description" onChange={(event)=>changeHandler(event)}/>
                    {errors.description && (<h5>{errors.description}</h5>)}
                </div>
                <div>
                    <label>Fecha de Lanzamiento:</label>
                    <input type="date" value={input.released} name="released" onChange={(event)=>changeHandler(event)}/>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={input.rating} name="rating" onChange={(event)=>changeHandler(event)}/>
                    {errors.rating && (<h5>{errors.rating}</h5>)}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.image} name="image" onChange={(event)=>changeHandler(event)}/>
                </div>
                <div>
                    <label>Generos:</label>
                    <select onChange={(event)=> genreSelectHandler(event)}>
                        {genres.map((genre)=>(
                            <option value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                    {errors.genres && (<h5>{errors.genres}</h5>)}
                    <ul>{input.genres.map(element=> element+", ")}</ul>
                </div>
                <div>
                    <label>Plataformas:</label>
                    <select onChange={(event)=> platformSelectHandler(event)}>
                            <option value="Android">Android</option>
                            <option value="Atari7800">Atari 7800</option>
                            <option value="Genesis">Genesis</option>
                            <option value="Game Boy">Game Boy</option>
                            <option value="Nintendo 64">Nintendo 64</option>
                            <option value="Wii">Wii</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="iOS">iOS</option>
                            <option value="PC">PC</option>
                    </select>
                    {errors.platforms && (<h5>{errors.platforms}</h5>)}
                    <ul>{input.platforms.map(element=> element+", ")}</ul>
                </div>
                {Object.keys(errors).length > 0? <button id="formCreateButton" type="submit" disabled={true}>Crear</button>:
                <button id="formCreateButton" type="submit">Crear</button>}
            </form>
        </div>
    )
}

export default CreateVideogame