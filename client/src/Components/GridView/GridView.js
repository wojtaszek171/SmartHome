import React from 'react';
import AquariumSection from './GridComponents/AquariumSection/AquariumSection';
import DateTime from './GridComponents/DateTime';
import Room from './GridComponents/Room/Room';
import Weather from './GridComponents/Weather';
import GridItem from './GridItem';
import './GridView.scss';

const GridView = () => {
  return (
    <div className="grid-component noselect">
      <GridItem>
        <DateTime />
      </GridItem>
      <GridItem>
        <Room/>
      </GridItem>
      <GridItem>
        <Weather/>
      </GridItem>
      <GridItem title="Akwarium">
        <AquariumSection/>
      </GridItem>
    </div>
  );
}

export default GridView;
