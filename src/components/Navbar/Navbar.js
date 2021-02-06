import React, { useState, useEffect } from 'react';
import { Search } from '@material-ui/icons'
import logo from '../../images/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import './nav.css'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { Avatar, Badge, Button, Typography } from '@material-ui/core';
import axios from 'axios';
const Navbar = () => {
    const [query, setquery] = useState('')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const API = 'ce4ff5cff7053adedff9bb09f9ff4b23'
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const handleSearch = () => {
        const { data } = axios.get('http://api.themoviedb.org/3/discover/movie?api_key=ce4ff5cff7053adedff9bb09f9ff4b23')
        console.log(data);
    }
    const StyledBadge = withStyles((theme) => ({
        badge: {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))(Badge);
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));
    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }
    const currentTab = (history, path) => {
        if (history.location.pathname === path) {
            return { backgroundColor: '#58585821' };
        } else {
            return { backgroundColor: '' };
        }
    };
    return (
       <div>
            <ul className='nav bg-light'>
                <div className='nav-tab d-flex'>
                <li className="nav-item mt-1">
                    <Link to='/' className='nav-link'>
                        <h4 className='titlesss'>FLIXTER</h4>
                    </Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to='/' style={currentTab(history,'/')} className='nav-link'>
                        Home
                    </Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to='/movies' style={currentTab(history,'/movies')} className='nav-link'>
                        Discover
                    </Link>
                </li>
                </div>
                {
                    user ? (
                        <div className='nav-tab d-flex'>
                            <li className="nav-item">
                            <Link to='/profile' className='nav-link'>
                                <StyledBadge
                                    className='mr-3'
                                    overlap="circle"
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
                                    variant="dot"
                                    >
                            <Avatar className='mr-0' src={user.result.selectedFile}/>
                        </StyledBadge>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/auth' className='nav-link mt-1'>
                                <Button variant="outlined" color="primary" onClick={logout}>Logout</Button>
                            </Link>
                        </li>
                        </div>
                    ) : (
                        <Button className='mr-2' component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                    )
                }
            </ul>
       </div>
    )
}

export default Navbar
