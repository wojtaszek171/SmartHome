import React, { FC } from 'react';
import './AquariumSection.scss';

interface AquariumSectionProps {
  temperature: string;
}

const AquariumSection: FC<AquariumSectionProps> = ({ temperature }) => {

  return (
    <div className="aquarium-section-component">
      <div className="water-temperature">
        <div className="text-value">
          <span>{temperature}°C</span>
        </div>
      </div>
    </div>
  );
}

export default AquariumSection;
