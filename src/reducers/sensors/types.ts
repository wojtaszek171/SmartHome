import { Action } from 'redux';

export interface Sensor {
    key: string;
    name: string;
    value: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface SensorsState {
    [key: string]: Sensor
}

export interface SetSensorsData extends Action {
    type: string;
    payload: Sensor[];
}
