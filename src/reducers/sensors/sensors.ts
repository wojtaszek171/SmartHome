import { ActionCreator, Reducer } from 'redux';
import { Sensor, SensorsState, SetSensorsData } from './types';

const SENSORS_SET = 'SENSORS_SET';

export const getInitialSensorObject = (key: string) => ({
  key,
  name: '',
  value: '--',
  createdAt: null,
  updatedAt: null
})

const defaultState: SensorsState = {};

export const sensors: Reducer<SensorsState> = (state = defaultState, action) => {
    switch (action.type) {
      case SENSORS_SET:
        return {
          ...state,
          ...Object.fromEntries(action.payload.map((sensor: Sensor) => [sensor.key, sensor]))
        }
      default:
        return state
    }
};

export const setSensorsData: ActionCreator<SetSensorsData> = (data: Sensor[]) => ({
  type: SENSORS_SET,
  payload: data
});
