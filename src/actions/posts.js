import * as api from '../api/api'
export const getPosts = () => async(dispatch) => {
    try{
        const {data} = await  api.fetchPosts();

        dispatch({type: 'FETCH_ALL', payload: data})
    }
    catch(error){
        console.log(error.message)
    }
}
export const createPost = (postData) => async(dispatch) => {
    try{
        const {data} = await  api.createPost(postData);

        dispatch({type: 'CREATE', payload: data});
    }
    catch(error){
        console.log(error)
    }
}
export const updatePost = (id,postData) => async(dispatch) => {
    try{
        const {data} = await  api.updatePost(id,postData);

        dispatch({type: 'UPDATE', payload: data});
    }
    catch(error){
        console.log(error.message)
    }
}
export const deletePost = (id) => async(dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({type: 'DELETE', payload: id});
    }
    catch(error){
        console.log(error)
    }
}
export const likeCount = (id) => async(dispatch) => {
    try{
        const {data} = await api.likeCount(id);

        dispatch({type: 'UPDATE_LIKE', payload: data});
    }
    catch(error){
        console.log(error)
    }
}
export const addComment = (id,cData) => async(dispatch) => {
    try{
        const {data} = await api.createComment(id,cData);

        dispatch({type: 'ADD_COMMENT', payload: data});
    }
    catch(error){
        console.log(error)
    }
}
