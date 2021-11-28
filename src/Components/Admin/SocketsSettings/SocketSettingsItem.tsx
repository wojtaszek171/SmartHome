import React, { FC, useState } from 'react';
import { Button, Checkbox, Input, Select, Toggle } from 'pwojtaszko-design';
import { SocketItem } from './SocketsSettings';

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
      </div>
      <div className='socket-light-modes'>
        <div className='light-modes-switch'>
          <Checkbox
            checked={useLightModes}
            onChange={setUseLightModes}
          />
          <span>Light modes (Aquael)</span>
        </div>
        {useLightModes && <div className='light-mode-input-wrapper'>
          <ul>
            {currentLightModes?.map((mode) => <li>{`${mode[0]} -> ${mode[1]}`}</li>)}
          </ul>
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
            text='✓'
            handleClick={handleAddLightMode}
          />
        </div>
        }
      </div>
    </div>
  );
}

export default SocketSettingsItem;
