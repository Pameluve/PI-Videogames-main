import React from "react";
import { Link } from "react-router-dom";
import './styles/landingPage.css'
import titulo from "../media/TituloLanding.gif"

const LandingPage = ()=>{
    return(
        <div className="backgroundLanding">       
            <div>
                <img src= {titulo} alt=""/>
            </div>
            <Link to="/home">
            <button id="btnLanding">Get Started</button>
            </Link>
        </div>
    )
};

export default LandingPage;