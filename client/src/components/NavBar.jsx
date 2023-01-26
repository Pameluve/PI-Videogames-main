import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";
import { Link } from "react-router-dom";
import './styles/navBar.css'

const Navbar = ({setCurrentPage})=>{
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const inputHandler = (event)=>{
        event.preventDefault();
        setName(event.target.value)
        setCurrentPage(1);
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(getByName(name));
    }

    return(
        <div className="navContainer">
            <input type="text" placeholder="Nombre del Videojuego..." onChange={(event)=> inputHandler(event)}/>
            <button id="searchButton" type="submit" onClick={(event)=> submitHandler(event)}>Buscar</button>
            <Link to ="/createVideogame"><button id= "navButton">Crear Videojuego</button></Link>
        </div>
    )
};

export default Navbar;