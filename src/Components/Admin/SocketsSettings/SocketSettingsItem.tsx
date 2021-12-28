import React, { FC, useState } from 'react';
import { Button, Checkbox, Input, Select, Toggle } from 'pwojtaszko-design';
import { SocketItem } from './SocketsSettings';
import Collapse from 'src/Components/Collapse';

interface SocketSettingsItemProps {
  socketObj: SocketItem;
  onChange: Function;
};

const SocketSettingsItem: FC<SocketSettingsItemProps> = ({ onChange, socketObj }) => {

  const [useLightModes, setUseLightModes] = useState(false);
  const [lightModeHour, setLightModeHour] = useState('');
  const [lightMode, setLightMode] = useState('');

  const currentLightModes = socketObj.lightModes?.split('/').map(lightModeString => lightModeString.replace(/:/,';').split(';'))
    
  const handleUpdateSocket = (newValue: any) => {
    onChange({
    ...socketObj,
    ...newValue
    });
  };

  const handleAddLightMode = (val: string) => {
    const newMode = `${lightMode}:${lightModeHour}`;
  }
  
  return (
    <div className="socket-settings-item">
      <div className='socket-start-stop'>
        <div className="socket-switch">
          <span>{socketObj.name}</span>
          <div className="toggle-wrapper">
            <Toggle
              checked={socketObj.enabled}
              onClick={(val: boolean) => handleUpdateSocket({ enabled: val })}
            />
          </div>
        </div>
      </div>
      <Collapse
        collapseTitle='Advanced'
        collapsed
      >
        <div className='socket-advanced'>
          <div className="socket-inputs">
            <Input
              disabled={!socketObj.enabled}
              label={'Start'}
              value={socketObj.start}
              type="time"
              onChange={(val: string) => handleUpdateSocket({ start: val })}
            />
            <Input
              disabled={!socketObj.enabled}
              label={'End'}
              value={socketObj.stop}
              type="time"
              onChange={(val: string) => handleUpdateSocket({ stop: val })}
            />
          </div>
          {socketObj.key === 'socket1' && <>
            <span>Light modes (Aquael)</span>
            <div className='light-modes-list'>
              <div className='light-modes-row'>
                <span>MODE</span>
                <span>ENABLE HOUR</span>
              </div>
              {currentLightModes?.map((mode) => <div className='light-modes-row'>
                <span>
                  {mode[0]}
                </span>
                <span>
                  {mode[1]}
                </span>
                <span className='delete-light-mode'>
                  🗑️
                </span>
              </div>)}
            </div>
            <div className='light-mode-input-wrapper'>
              <div className='select-wrapper'>
                <span>Mode</span>
                <Select
                  options={[{
                    key: '1',
                    item: '1'
                  },
                  {
                    key: '2',
                    item: '2'
                  },
                  {
                    key: '3',
                    item: '3'
                  }]}
                  onChange={setLightMode}
                />
              </div>
              <Input
                label={'Change time'}
                value={lightModeHour}
                type="time"
                onChange={setLightModeHour}
              />
              <Button
                text='+'
                handleClick={handleAddLightMode}
              />
            </div>
          </>
          }
        </div>
      </Collapse>
      
    </div>
  );
}

export default SocketSettingsItem;
