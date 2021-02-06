import axios from 'axios';

const BACKEND_API = axios.create({
    baseURL:'https://flixster123.herokuapp.com/'
})

BACKEND_API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = () => BACKEND_API.get('/post');
export const createPost = (postData) => BACKEND_API.post('/post',postData);
export const updatePost = (id,updatedPostData) => BACKEND_API.patch(`/post/${id}`,updatedPostData)
export const deletePost = (id) => BACKEND_API.delete(`/post/${id}`);
export const likeCount = (id) => BACKEND_API.patch(`/post/${id}/likeCount`)
export const createComment = (id,postData) => BACKEND_API.patch(`/post/comment/${id}`,postData)


export const sigin = (formData) => BACKEND_API.post('/users/signin',formData)
export const sigup = (formData) => BACKEND_API.post('/users/signup',formData)
export const addToFav = (id,movieData) => BACKEND_API.patch(`/users/favourite/${id}`,movieData)

export const getFav = () => BACKEND_API.get('/favourite')
export const postFav = (mdata) => BACKEND_API.post('/favourite',mdata)
export const dltFav = (id) => BACKEND_API.delete(`/favourite/${id}`)