import { combineReducers } from "redux";
import authData from "./auth";
import posts from './post'
import favMovie from './favMovie'

export default combineReducers({ posts,authData,favMovie })