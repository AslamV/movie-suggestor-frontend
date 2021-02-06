import React,{useState,useEffect} from 'react'

import './banner.css'
import { instance } from '../../../api/request';
function Banner({fetchUrl}) {
    const [movie, setMovie] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
            const request = await instance.get(fetchUrl)

            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ])
            return request;
        }
        fetchData();
    },[])

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    return (
        <header className = "banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center"
        }}
    >

        <div className = "banner__contents">
            <h1 className = "banner__title">
                {movie?.title || movie.name || movie?.orignal_name}
            </h1>

            <div className = "banner__buttons">
                <a href='https://www.netflix.com/'> <button className="banner__button" >Watch Now</button></a>
                {/* <button className = "banner__button">My List</button> */}
            </div>
                <h1 className = "banner__description">{truncate(movie?.overview, 150)}</h1>
        </div>
        {/* <div className = "banner__fadeBottom" ></div> */}
    </header>
    )
}

export default Banner
