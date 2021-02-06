export default (favMovie = [], action) => {
    switch (action.type) {
        case 'GET_MOVIE':
            return action.payload;
        case 'DLT_MOVIE':
            return favMovie.filter((movie) => movie._id !== action.payload);
        case 'POST_MOVIE':
            return [...favMovie, action.payload];
        default:
            return favMovie;
    }
}