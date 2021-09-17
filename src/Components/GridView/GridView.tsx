import React from 'react';
import AquariumSection from './GridComponents/AquariumSection';
import CalendarSection from './GridComponents/Calendar';
import DateTime from './GridComponents/DateTime';
import Room from './GridComponents/Room';
import Sockets from './GridComponents/Sockets';
import ToDoList from './GridComponents/ToDoList';
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
      <GridItem title="Sockets">
        <Sockets/>
      </GridItem>
      {/* <GridItem title="Calendar">
        <CalendarSection/>
      </GridItem> */}
      <GridItem title="ToDo List">
        <ToDoList/>
      </GridItem>
    </div>
  );
}

export default GridView;
