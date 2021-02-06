import React from 'react'
import './Pinfo.css'
import { Avatar, Container, Typography } from '@material-ui/core'
function PInfo() {
    const {result} = JSON.parse(localStorage.getItem('profile'))
    return (
        <div className='profile'>
            <Avatar  style={{height:'200px',width:'200px'}} src={result.selectedFile}></Avatar>
            <Typography className='my-3' variant="h5">{result.name}</Typography>
        </div>
    )
}

export default PInfo
