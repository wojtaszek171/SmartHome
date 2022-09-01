import React, { FC } from 'react';
import { Sensor } from 'src/reducers/sensors/types';
import './AquariumSection.scss';

interface AquariumSectionProps {
  temperature: Sensor;
}

const AquariumSection: FC<AquariumSectionProps> = ({ temperature }) => {

  return (
    <div className="aquarium-section-component">
      <div className="water-temperature">
        <div className="text-value">
          <span>{temperature?.value}°C</span>
        </div>
      </div>
    </div>
  );
}

export default AquariumSection;
