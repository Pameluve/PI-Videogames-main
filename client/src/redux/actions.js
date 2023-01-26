import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_GENRES = "GET_GENRES"
export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID"
export const CREATED_BY_FILTER = "CREATED_BY_FILTER"
export const FILTER_BY_GENRES = "FILTER_BY_GENRES"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const POST_GAME = "POST_GAME "
export const CLEAN_PAGE = "CLEAN_PAGE"

//---------------------------GET-------------------------------
export const getVideogames = ()=>{
    return async (dispatch)=>{
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch({type: GET_VIDEOGAMES, payload: json.data});
    }
};

export const getByName = (name)=>{
    return async (dispatch)=>{
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({type: GET_BY_NAME, payload: json.data})
        } catch (error) {
            return alert("Game not found")
        }
    }
};

export const getDetailById = (id)=>{
    return async (dispatch)=>{
        try {
            const json = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({type: GET_DETAIL_BY_ID, payload: json.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export const getGenres = ()=>{
    return async (dispatch)=>{
        const json = await axios.get("http://localhost:3001/genres");
        return dispatch({type: GET_GENRES, payload: json.data})
    }
};


//---------------------------POST-------------------------------
export const postGame = (payload)=> async (dispatch)=>{ 
    try {
        await axios.post("http://localhost:3001/videogames", payload);
        return dispatch({type: POST_GAME});
    } catch (error) {
        return alert("Information missing");
}};


//---------------------------FILTERS-------------------------------
export const createdByFilter = (payload)=>{
    return {type: CREATED_BY_FILTER, payload: payload}
};

export const filterByGenres = (payload)=>{
    return {type: FILTER_BY_GENRES, payload: payload }
};

//---------------------------ORDER-------------------------------
export const orderByName = (payload)=>{
    return{type: ORDER_BY_NAME, payload: payload}
};

export const orderByRating = (payload)=>{
    return{type: ORDER_BY_RATING , payload: payload}
};

export const cleanPage = ()=>{
    return {type: CLEAN_PAGE}
};