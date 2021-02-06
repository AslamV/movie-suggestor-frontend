import React, { useState } from 'react';
import {Switch,BrowserRouter,Route} from 'react-router-dom'
import {Container,Grid} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar';
import Discover from './components/Discover/Discover'
import Home from './components/home/Home'
import Auth from './components/auth/Auth';
import Profile from './components/Profile/Profile';
import  './app.css'
function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
            </div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/movies" exact component={Discover}/>
                <Route path="/auth" exact component={Auth}/>
                <Route path='/profile' exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App
