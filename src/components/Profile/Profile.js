import React from 'react'
import { useSelector } from 'react-redux'
import {Container,Grid} from '@material-ui/core'
import PInfo from './PInfo'
import PData from './PData'
function Profile() {
    return (
        <Grid container justify="space-around" alignItems="stretch" spacing={2}>
            <Grid item xs={12} sm={4}>
                <PInfo/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <PData/>
            </Grid>
        </Grid>
    )
}

export default Profile
