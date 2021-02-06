import React, { useState,useEffect } from 'react'
import './pop.css'
import {Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import Youtube from 'react-youtube';
import ReactPlayer from 'react-player'
import { postMovie } from '../../../../actions/favMovi'
import { fetchMovieVideos, instance } from '../../../../api/request'
import CustomizedSnackbar from '../../../home/Snackbar';
const Pop = ({ movie,genres,ifSeries }) => {
    const [moviVideo, setmoviVideo] = useState('')
    const [openSnack, setopenSnack] = useState(false)
    const [open, setopen] = useState(false)
    useEffect(() => {
        const fetchVideo = async () => {
            const data = await fetchMovieVideos(movie.id)
            setmoviVideo(data?.key)
        }
        fetchVideo()
    }, [movie.id])
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(moviVideo)
    const addFav = (name,img_path,id) => {
        const movieData={
            movieName:name,
            movieUrl:img_path,
            movieId:id,
            movieGenre:genres
        }
        dispatch(postMovie(movieData))
        setopenSnack(!openSnack)
    }
    const opts = {
		height: '390',
		width: '100%',
		playerVars: {
            'origin': 'http://localhost:8000',
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1
		}
    };
    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    const youtubeUrl = "http://www.youtube.com/watch?v=";
    return (
        <div className='pop container'>
            <CustomizedSnackbar open={openSnack} setOpen={setopenSnack} message='Movie added to favourites'/>
            <div class="movie_card" id="bright">
                <div class="info_section">
                    <div class="movie_header">
                        <img class="locandina" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} />
                        <h1>{movie.title || movie.name}</h1>
                        <h4>{movie.release_date || movie.first_air_date}</h4>
                        <span class="minutes">{ifSeries ? `${movie.number_of_seasons} Season` : `${movie.runtime}min`}</span>
                        <p class="type">{genres.map((g) => `${g} `)}</p>
                    </div>
                    <div class="movie_desc">
                        <p class="text">
                            {truncate(movie.overview,350)}
                        </p>
                    </div>
                    <div class="movie_social">
                        <ul>
                            {ifSeries ? (
                                <li><i><a href={movie.homepage}><Button size="small" variant="contained" color="secondary">Watch on Netflix</Button></a></i></li> 
                            ) : (
                                <li><i><Button size="small" onClick={() => setopen(!open)} variant="contained" color="secondary">Watch Trailer</Button></i></li> 
                            ) }
                            {!ifSeries && 
                                (
                            <li><i class="material-icons"><Button size='small' variant="outlined" color='primary' onClick={() => addFav(movie.title,movie.poster_path,movie.id)} >Add to Favourites</Button></i></li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundSize:"cover"}} class="blur_back bright_back"></div>
            </div>
            {open && <ReactPlayer 
                        className="container-fluid"
                        url={youtubeUrl + moviVideo}
                        playing
                        width="100%"
            />}
        </div>
    )
}

export default Pop
