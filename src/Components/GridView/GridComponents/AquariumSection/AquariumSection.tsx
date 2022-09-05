import React, { FC } from 'react';
import { Sensor } from 'src/reducers/sensors/types';
import SensorComponent from '../Sensor';
import { SensorTypes } from '../Sensor/Sensor';
import './AquariumSection.scss';

interface AquariumSectionProps {
  temperature: Sensor | undefined;
}

const AquariumSection: FC<AquariumSectionProps> = ({ temperature }) => {  
  return (
    <div className="aquarium-section-component">
      <SensorComponent
        type={SensorTypes.TEMPERATURE}
        data={temperature}
        customTitle=''
      />
    </div>
  );
}

export default AquariumSection;
