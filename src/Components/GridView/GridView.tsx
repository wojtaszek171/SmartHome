import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSensorsData } from 'src/reducers/sensors/sensors';
import { getSensorsData } from 'src/restService/restService';
import AquariumSection from './GridComponents/AquariumSection';
import DateTime from './GridComponents/DateTime';
import Room from './GridComponents/Room';
import Sockets from './GridComponents/Sockets';
import ToDoList from './GridComponents/ToDoList';
import Weather from './GridComponents/Weather';
import GridItem from './GridItem';
import './GridView.scss';

const GridView = () => {
  const dispatch = useDispatch();

  const fetchSensors = async () => {
    try {
      const sensors = await getSensorsData();
      dispatch(setSensorsData(sensors));
    } catch (e) {
      console.log('Failed to read API');
    }
  };

  useEffect(() => {
    fetchSensors();

    const fetchInterval = setInterval(
      fetchSensors,
    5000);

    return () => clearInterval(fetchInterval);
  })

  return (
    <div className="grid-component noselect">
      <GridItem>
        <DateTime />
      </GridItem>
      <GridItem title='Na zewnątrz'>
        <Room
          tempKey='room1TempOut'
          humidityKey='room1HumidityOut'
        />
      </GridItem>
      <GridItem title='Salon'>
        <Room
          tempKey='room1Temp'
          pressureKey='room1Pressure'
          humidityKey='room1Humidity'
        />
      </GridItem>
      <GridItem title='Biuro'>
        <Room
          tempKey='roomAquariumTemp'
          humidityKey='roomAquariumHumidity'
        />
      </GridItem>
      <GridItem title='Kuchnia'>
        <Room
          tempKey='room2Temp'
          humidityKey='room2Humidity'
        />
      </GridItem>
      <GridItem title='Pokój Ani'>
        <Room
          tempKey='room3Temp'
          humidityKey='room3Humidity'
        />
      </GridItem>
      <GridItem title='Sypialnia'>
        <Room
          tempKey='room4Temp'
          humidityKey='room4Humidity'
        />
      </GridItem>
      <GridItem>
        <Weather/>
      </GridItem>
      <GridItem title="Akwarium">
        <AquariumSection/>
        <Sockets/>
      </GridItem>
      {/* <GridItem title="TODO">
        <ToDoList
          list={[
            {
              title: 'need to do 2',
              order: 2,
              styles: {
                color: '#941111'
              }
            },
            {
              title: 'need to do 1',
              order: 1,
              checked: false
            },
            {
              title: 'need to do 3',
              order: 3,
              checked: true
            }
          ]}
        />
      </GridItem> */}
    </div>
  );
}

export default GridView;
