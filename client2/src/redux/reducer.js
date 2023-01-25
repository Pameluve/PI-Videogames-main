import { GET_VIDEOGAMES, CREATED_BY_FILTER, FILTER_BY_GENRES, ORDER_BY_NAME, ORDER_BY_RATING, GET_BY_NAME, GET_GENRES, POST_GAME, GET_DETAIL_BY_ID} from "./actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    detail:[],
    genres: []
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }
        case GET_DETAIL_BY_ID:
            return{
                ...state,
                detail: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case POST_GAME:
            return{
                ...state,
            }
        case CREATED_BY_FILTER:
            const allVideogames = state.allVideogames
            const createdByFilter = action.payload === "InfoDB"?
                allVideogames.filter(game => game.createdInDB):
                allVideogames.filter(game => !game.createdInDB)
            return{
                ...state,
                videogames: createdByFilter
            }
        case FILTER_BY_GENRES:
            const allGames = state.allVideogames
            const filterByGenres = allGames.filter(game => game.genres.includes(action.payload))
            return{
                ...state,
                videogames: filterByGenres
            }

        case ORDER_BY_NAME:
            let sortedArray = action.payload === "asc"?
            state.videogames.sort(function(a,b){
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) :
            state.videogames.sort(function(a,b){
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            })
            return{
                ...state,
                videogames: sortedArray
            }
        case ORDER_BY_RATING:
            let ratingArray = action.payload === "RatingDESC"? 
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(a.rating < b.rating) return -1;
                return 0;
            }) :
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating) return -1;
                if(a.rating < b.rating) return 1;
                return 0;
            })
            return{
                ...state,
                videogames: ratingArray
            }
        default:
            return state;
    };
};

export default rootReducer;