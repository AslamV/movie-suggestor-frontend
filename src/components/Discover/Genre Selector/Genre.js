import React, { useEffect, useState } from 'react'
import { Select, MenuItem, FormControl, InputLabel, Input } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Row from '../Row/Row';
import request, { instance } from '../../../api/request';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
function Genre({ setgenreTitle, setopen }) {
    const [genresName, setgenresName] = useState([])
    const [genresMovie, setgenresMovie] = useState([])
    useEffect(async () => {
        const { data: { genres } } = await instance.get(request.fetchGenre)
        console.log(genres)
        setgenresName(genres)
    }, [])

    const handleGenreClick = (id,name) => {
        const url = `/discover/movie?api_key=ce4ff5cff7053adedff9bb09f9ff4b23&with_genres=${id}`
        setgenreTitle({
            name:name,
            url:url
        })
        setopen(st => !st)
    }


    return (
        <div className='m-4'>
            {genresName.map((item,index) => (
                <li className="list-inline-item" key={index}>
                <button
                type="button"
                className="btn btn-outline-info mt-3"
                onClick={() => {
                handleGenreClick(item.id,item.name);
                }}
                >
                {item.name}
            </button>
            </li>
            ) )}
        </div>
    )
}

export default Genre
