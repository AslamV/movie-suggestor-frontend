import * as api from '../api/api'


export const toSignin = (formData,history) => async(dispatch) => {
    try{
        const {data} = await  api.sigin(formData);

        dispatch({type: 'AUTH',data})
        history.push('/')
    }
    catch(error){
        console.log(error.message)
    }
}
export const toSignup = (fromData,history) => async(dispatch) => {
    try{
        const {data} = await  api.sigup(fromData);
        console.log(data)
        dispatch({type: 'AUTH',data})
        history.push('/')
    }
    catch(error){
        console.log(error.message)
    }
}
export const addFavourite = (id,movieData) => async(dispatch) => {
    try{
        const {data : {result}} = await api.addToFav(id,movieData);
        console.log(result)
        dispatch({type:'ADD_FAVOURITE',result});
    }
    catch(error){
        console.log(error)
    }
}