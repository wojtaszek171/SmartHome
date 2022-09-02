import moment from 'moment';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import i18nInstance from 'src/i18n/i18nInstance';
import { Sensor } from 'src/reducers/sensors/types';
import Icon from '../../../Icon/Icon';
import './Sensor.scss';

export enum SensorTypes {
  HUMIDITY = 'humidity',
  PRESSURE = 'pressure',
  TEMPERATURE = 'temperature'
}

interface SensorComponentProps {
  type: SensorTypes;
  data: Sensor;
  customTitle?: string;
}

const SensorComponent: FC<SensorComponentProps> = ({ type, data, customTitle }) => {
  const { t } = useTranslation('common', { i18n: i18nInstance });

  const isStale = () => {
    const diff = moment().diff(moment(data?.updatedAt), 'seconds');
    
    return diff > 60;
  };

  return (
    <div className='sensor-component'>
      <div className='sensor-icon'>
        <Icon name={type} width='30px'/>
        {isStale() && <div className='stale-icon'>
          <Icon name={'exclamation'} width='20px'/>
        </div>}
      </div>
      <span className='text-title'>{customTitle !== undefined ? customTitle : t(type)}</span>
      <span className='text-value'>{data?.value || '--'} °C</span>
    </div>
  );
}

export default SensorComponent;
