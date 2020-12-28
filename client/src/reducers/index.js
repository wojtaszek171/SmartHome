import { combineReducers } from "redux"
import { session } from "./session"
import { weather } from "./weather";

export default combineReducers({
    session,
    weather
});