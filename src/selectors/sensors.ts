import { ApplicationState } from "src/reducers";

export const getSensors = (state: ApplicationState) => state.sensors;

export const getSensorByKey = (key: string) => (state: ApplicationState) => state.sensors[key];
