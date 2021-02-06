import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {Button, Grid} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import './Pinfo.css'
import Pop from '../Discover/Row/Pop/Pop'
import { dltmovie, getMovies } from '../../actions/favMovi'
import { dltFav } from '../../api/api'
function MyFavourites() {
    const [open, setopen] = useState(false)
    const [mdata, setmdata] = useState([])
    const [genre, setgenre] = useState([])
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const mUrl = 'https://image.tmdb.org/t/p/original/';
    const API = '719944d4c67075197ac4549527bf9438';
    useEffect(() => {
        dispatch(getMovies())
    }, [])
    const favMovie = useSelector((state) => state.favMovie)
    console.log(favMovie)
    const showPop = async (id,gen) => {
        setopen(!open)
        setgenre(gen)
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=en-US`)
        setmdata(data)
    }
    const myMovies = favMovie.filter((movie) => movie.creator === user.result._id)
    console.log(myMovies)
    return (
        <Grid container spacing={1} className='favCont'>
            {
                myMovies.map((m) => (
                    <Grid item xs={10} sm={4} >
                    <div onClick={() => showPop(m.movieId,m.movieGenre)} className='favItem'  style={{backgroundImage:`url(${mUrl}/${m.movieUrl})`,backgroundSize:'cover'}}>
                    </div>
                    <Button variant='outlined' className='mt-1 ml-6'  onClick={() => dispatch(dltmovie(m._id))} size='small'>Remove</Button>
                    </Grid>
                ))
            }
        {open && <Pop movie={mdata} genres={genre} />}

        </Grid>
    )
}

export default MyFavourites
