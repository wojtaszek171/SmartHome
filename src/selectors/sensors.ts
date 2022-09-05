import { ApplicationState } from "src/reducers";
import { getInitialSensorObject } from "src/reducers/sensors/sensors";

export const getSensors = (state: ApplicationState) => state.sensors;

export const getSensorByKey = (key: string) => (state: ApplicationState) => key ? state.sensors[key] || getInitialSensorObject(key) : undefined;
