import React, { useState } from 'react'
import './discover.css'
import Row from './Row/Row'
import request from '../../api/request'
import Banner from './Banner/Banner'
import Genre from './Genre Selector/Genre'
const Discover = () => {
    const [genreTitle, setgenreTitle] = useState({name:'',url:''})
    console.log(genreTitle)
    const [open, setopen] = useState(false)
    return (
        <section className='discover'>
                    <Banner fetchUrl={request.topRated}/>
                    <Genre setgenreTitle={setgenreTitle} setopen={setopen}/>
                    {open && <Row title={genreTitle.name} fetchUrl={genreTitle.url}/>}
                    <Row title="TV-Shows" isSeries fetchUrl={request.netflixOrg}/>
                    <Row title="Up-Coming"  fetchUrl={request.upcoming}/>
                    <Row title="Trending Now" fetchUrl={request.trendingMovies}/>
                    <Row title="Top Rated" fetchUrl={request.topRated}/>
                
        </section>
    )
}

export default Discover
