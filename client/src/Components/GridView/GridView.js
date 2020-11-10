import React from 'react';
import AquariumSection from './GridComponents/AquariumSection/AquariumSection';
import DateTime from './GridComponents/DateTime';
import RoomTemperature from './GridComponents/RoomTemperature';
import Weather from './GridComponents/Weather';
import GridItem from './GridItem';
import './GridView.scss';

const GridView = () => {
  return (
    <div className="grid-component">
      <GridItem>
        <DateTime />
      </GridItem>
      <GridItem title="Pokój">
        <RoomTemperature/>
      </GridItem>
      <GridItem title="Akwarium">
        <AquariumSection/>
      </GridItem>
      <GridItem>
        <Weather/>
      </GridItem>
    </div>
  );
}

export default GridView;
