import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  createdByFilter,
  orderByName,
  orderByRating,
  filterByGenres,
  getGenres,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import Navbar from "./NavBar";
import "./styles/home.css";
import loading from "../media/Spinner.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  //---------------------------PAGINADO-------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
  const paginado = (pageNumber) => setCurrentPage(pageNumber);
  //------------------------------------------------------------------
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  //---------------------------HANDLERS-------------------------------
  const clickHandler = (event) => {
    event.preventDefault();
    dispatch(getVideogames());
  };

  const createdByFilterHandler = (event) => {
    dispatch(createdByFilter(event.target.value));
    setCurrentPage(1);
  };

  const filterByGenresHandler = (event) => {
    dispatch(filterByGenres(event.target.value));
    setCurrentPage(1);
  };

  const orderHandler = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };

  const ratingHandler = (event) => {
    event.preventDefault();
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
    setOrder(event.target.value);
  };

  return (
    <div className="backgroundHome">
      <Navbar setCurrentPage={setCurrentPage} />
      <button
        id="buttonHome"
        onClick={(event) => {
          clickHandler(event);
        }}
      >
        Cargar todos los juegos
      </button>
      <div className="filtrosHome">
        <h3>Ordenar/filtrar los videojuegos:</h3>
        <select onChange={(event) => orderHandler(event)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onChange={(event) => ratingHandler(event)}>
          <option value="RatingASC">Mejor puntuado</option>
          <option value="RatingDESC">Peor Puntuado</option>
        </select>
        <select onChange={(event) => createdByFilterHandler(event)}>
          <option value="InfoAPI">Games existentes</option>
          <option value="InfoDB">Games propios</option>
        </select>
        <select onChange={(event) => filterByGenresHandler(event)}>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <div className="paginado">
          <Paginado
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
            currentPage={currentPage}
            div
          />
        </div>
        <div className="card-container-home">
          {!currentGames.length ? (
            <div className="loading">
              <img src={loading} alt="cargando" />
            </div>
          ) : (
            currentGames?.map((game) => {
              return (
                <>
                  <Card
                    image={game.image}
                    id={game.id}
                    name={game.name}
                    genres={game.genres + " "}
                    rating={game.rating}
                  />
                </>
              );
            })
          )}
        </div>
        <div className="paginado">
          <Paginado
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
            currentPage={currentPage}
            div
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
