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
}

const SensorComponent: FC<SensorComponentProps> = ({ type, data: { value } }) => {
  const { t } = useTranslation('common', { i18n: i18nInstance });

  return (
    <div className="sensor-component">
      <Icon name={type} width='30px'/>
      <span className="text-title">{t(type)}</span>
      <span className="text-value">{value} °C</span>
    </div>
  );
}

export default SensorComponent;
