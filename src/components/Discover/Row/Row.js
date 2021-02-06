import React, { useState, useEffect } from 'react';
import './row.css';
import {instance} from '../../../api/request';
import {CircularProgress,Button} from '@material-ui/core'
// import {} from '@material-ui/icons'
import axios from 'axios';
import Pop from './Pop/Pop';
const imgUrl = 'https://image.tmdb.org/t/p/original/';
export default function Row({title,fetchUrl,isSeries}) {
    const [movies, setmovies] = useState([]);
    const [ifSeries, setifSeries] = useState(false)
    const [genres, setgenres] = useState([])
    const [loading, setloading] = useState(false)
    const [mdata, setmdata] = useState([])
    const [open, setopen] = useState(false);
    const API = '719944d4c67075197ac4549527bf9438';
    useEffect(
        () => {
            const fetchData = async () => {
                const requestt = await instance.get(fetchUrl);
                console.log(requestt)
                setmovies(requestt.data.results);
                setloading(!loading)
                return requestt;
            };
            fetchData();
        },
        [fetchUrl]
    );
        const showPop = async (id) => {
            setopen(!open)
            if(isSeries){
                setifSeries(!ifSeries)
                const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=en-US`)
                setmdata(data)
                const gen=[]
                const gene = () => data.genres.forEach(g => {
                gen.push(g.name)
                });
                gene()
                setgenres(gen)
                console.log(mdata)
            }
            else {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}&language=en-US`)
            const gen=[]
            const gene = () => data.genres.forEach(g => {
                gen.push(g.name)
            });
            gene()
            setgenres(gen)
            setmdata(data)
            }
           
        }
    return (
        <section className='row' style={{marginLeft:'10px'}}>
            <h1>{title}</h1>

                {
                    loading ? (
                        <div className='box'>
            {movies.map((movie) => {
                        return (
                                <img
                                    className={isSeries ? 'srs-poster' : 'img-poster'}
                                    onClick={() => showPop(movie.id)}
                                    key={movie.id}
                                    src={`${imgUrl}${movie.poster_path}`}
                                    alt=""
                                />
                        )
                }
                )}
            </div>
                    ) : <CircularProgress className='d-flex justify-content-center'/> 
                }
            {open  && (
                <Pop movie={mdata} ifSeries={ifSeries}  genres={genres}/>
            )}
        </section>
    );
}