import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailById, cleanPage } from "../redux/actions";
import "./styles/detail.css";
import loading from "../media/Spinner.gif";

const Detail = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const gameId = props.match.params.id;

  useEffect(() => {
    dispatch(getDetailById(gameId));
    return () => {
      dispatch(cleanPage());
    };
  }, [dispatch, gameId]);

  return (
    <div className="detailBackground">
      <div className="detailCard">
        {!detail.image ? (
          <div>
            <img src={loading} alt="cargando" />
          </div>
        ) : (
          <img
            src={detail.image}
            alt="not found"
            width="350px"
            height="200px"
          />
        )}
        <h1>{detail.name}</h1>
        <h4>Descripcion: {detail.description}</h4>
        <h4>Fecha de Lanzamiento: {detail.released}</h4>
        <h4>Rating: {detail.rating}</h4>
        <h4>Generos: {detail.genres + " "}</h4>
        <h4>Plataformas: {detail.platforms + " "}</h4>
      </div>
      <Link to="/home">
        <button id="detailButton">Volver</button>
      </Link>
    </div>
  );
};

export default Detail;
