import * as api from '../api/api'
export const getMovies = () => async(dispatch) => {
    try{
        const {data} = await  api.getFav();

        dispatch({type: 'GET_MOVIE', payload: data})
    }
    catch(error){
        console.log(error.message)
    }
}
export const postMovie = (movieData) => async(dispatch) => {
    try{
        const {data} = await  api.postFav(movieData);

        dispatch({type: 'POST_MOVIE', payload: data});
    }
    catch(error){
        console.log(error)
    }
}
export const dltmovie = (id) => async(dispatch) => {
    try{
        await api.dltFav(id);

        dispatch({type: 'DLT_MOVIE', payload: id});
    }
    catch(error){
        console.log(error)
    }
}