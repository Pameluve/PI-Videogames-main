import React from "react";
import './styles/paginado.css'

const Paginado = ({gamesPerPage, allVideogames, paginado, currentPage}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allVideogames/gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav className="container-paginado">
            <ul className="lista-paginado">
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li>
                    {currentPage===number?
                    <button id="selected" onClick={()=> paginado(number)}>{number}</button>:
                    <button id="notSelected" onClick={()=> paginado(number)}>{number}</button>}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginado;