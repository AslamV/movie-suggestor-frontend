import axios from 'axios'
export const API = '719944d4c67075197ac4549527bf9438';


export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});
const request = {
    topRated:  `/movie/top_rated?api_key=${API}&language=en-US&page=1`,
    nowPlaying:  `/movie/now_playing?api_key=${API}&language=en-US&page=1`,
    latestPlaying:  `/movie/latest?api_key=${API}&language=en-US&page=1`,
    upcoming:  `/movie/upcoming?api_key=${API}&language=en-US&page=1`,
    trendingMovies:  `/trending/movie/week?api_key=${API}`,
    discoverMovies:  `/movie/discover?api_key=${API}`,
    netflixOrg:  `/discover/tv?api_key=${API}&with_networks=213`,
    fetchGenre: `genre/movie/list?api_key=ce4ff5cff7053adedff9bb09f9ff4b23&language=en-US`,
    moviesUrl: `/discover/movie/api_key=${API}&language=en-US&page=1&with_genres=id`
}

export const fetchMovieVideos = async (id) => {
    try {
        const { data } = await instance.get(`/movie/${id}/videos`, {
            params: {
                api_key: API,
            }
        });
        return data['results'][0];
    } catch (error) { }
}

export default request;