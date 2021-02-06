import { Avatar, Button,Typography,Paper,Grid,Container,Alert} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import FileBase from 'react-file-base64'
import Input from './Input'
import {Icon} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import { useDispatch } from 'react-redux'
import useStyles from './style'
import { toSignin, toSignup } from '../../actions/auth'

const intialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    selectedFile:''
}
const Auth = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [isSignUp, setisSignUp] = useState(true)
    const [userData, setuserData] = useState(intialState)
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleShowPassword = () => setshowPassword((prevPass) => !prevPass)
    const history = useHistory()
    const switchMode = () => {
        setisSignUp((st) => !st)
        handleShowPassword(false)
    }
    const handleChange = (e) => {
        setuserData({...userData,[e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            dispatch(toSignup(userData,history)).then((data) => {
                if(data?.error){
                    setuserData({success:false})
                }else setuserData({success:true})
            })
        }
        else {
            dispatch(toSignin(userData,history)).then((data) => {
                if(data?.error){
                    setuserData({success:false})
                }else setuserData({success:true})
            })
        }
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:"AUTH", data: {result,token} })
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in was unsuccessfull")
    }
    const success = () => {
        <div className='alert alert-danger' style={{display: success ? 'none' : ""}}>
            Please try again
        </div>
    }
    return (
        <Container component="main" maxWidth="xs">
            {success()}
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Id" type="email" handleChange={handleChange} autoFocus/>
                        <Input name="password" label="Enter Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} autoFocus handleShowPassword={handleShowPassword} />
                        {
                        isSignUp && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange}/>
                        }
                        {isSignUp && 
                        <div className='mx-2 my-2'>
                            <h6 >Choose Profile</h6>
                            <FileBase
                            type='file'
                            multiple={false}
                            onDone = {({base64}) => setuserData({...userData,selectedFile:base64}) }
                            />
                        </div>
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                clientId="238956009379-namsn2njtahejf3l7qshmlg3j5dmrkc0.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon/>}
                    variant="contained"
                    >
                    Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
                />
                </form>
                <Grid item >
                        <Button onClick={switchMode}>
                            {
                                isSignUp ? "Already have an account?" : "Create an account?"
                            }
                        </Button>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth