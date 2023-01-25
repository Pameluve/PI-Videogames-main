import React from "react";
import { Link } from "react-router-dom";
import './styles/card.css'

const Card = ({image, name, genres, rating, id})=>{
    return(
        <div className = "container-card">
            <Link to ={`/videogames/${id}`}>
            <img src={image} alt="img not found" width="350px" height="200px"/>
            </Link>
            <h2>{name}</h2>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
        </div>
    )
}

export default Card;