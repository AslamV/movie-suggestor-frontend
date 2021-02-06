import React, { useEffect, useState } from 'react'
import { TextField,Button,Paper,Typography,Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style'
import { createPost } from '../../../actions/posts';
import CustomizedSnackbar from '../Snackbar';
function Form() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [postData, setpostData] = useState({
        message:'',creatorUrl:''
    })
    const [loading, setloading] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Please sign to create posts</Typography>
            </Paper>
        )
    }
    const clear = () => {
        setpostData({message:''});
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPost({...postData,name:user?.result?.name,creatorUrl:user?.result?.selectedFile}))
        setloading(!loading)
        clear();
    }

    return (
        <Paper style={{marginTop:'15px'}} className={classes.paper}>
            <CustomizedSnackbar open={loading} setOpen={setloading} message='Post created successfully.'/>
            <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography  variant='h6'>Write a post</Typography>
                <TextField
                name='message'
                variant='outlined'
                label='Message'
                fullWidth
                value={postData.message}
                onChange={(e) => setpostData({...postData,message:e.target.value})}
                />
                <Button className={classes.buttonSubmit} fullWidth variant='contained' type='submit' size="large" color="primary">Submit</Button>
            </form>
        </Paper>
    )
}

export default Form