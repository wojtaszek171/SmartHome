import { ApplicationState } from "src/reducers";

export const getSensors = (state: ApplicationState) => state.sensors;

export const getSensorValueByKey = (key: string) => (state: ApplicationState) => state.sensors[key]?.value;
