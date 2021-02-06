import React, { useState } from 'react'
import {Card,Avatar,Container,Grid,Grow,CardHeader,CardActions,IconButton,CardMedia,CardContent,Typography,TextField,InputAdornment,Paper,Collapse} from '@material-ui/core'
import './home.css'

import { makeStyles } from '@material-ui/core/styles';
import Form from './Form/Form'
import Posts from './Posts../Posts'
const Home = () => {
    
    return (
        <Grow in>
        <Container>
            <Grid style={{flexDirection:'row'}} container justify='space-between' alignItems='stretch' spacing={4}>
                <Grid item xs={12} sm={7}>
                    <Posts/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form/>
                </Grid>
            </Grid>
        </Container>
        </Grow> 
    )
}

export default Home
