import { combineReducers } from "redux"
import { session } from "./session/session"
import { SessionState } from "./session/types";
import { WeatherState } from "./weather/types";
import { weather } from "./weather/weather";

export interface ApplicationState {
    session: SessionState,
    weather: WeatherState
}

export default combineReducers<ApplicationState>({
    session,
    weather
});
