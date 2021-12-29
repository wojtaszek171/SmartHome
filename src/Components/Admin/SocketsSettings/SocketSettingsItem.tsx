import React, { FC, useEffect, useState } from 'react';
import { Button, Input, Select, Toggle } from 'pwojtaszko-design';
import { SocketItem } from './SocketsSettings';
import Collapse from 'src/Components/Collapse';
import arrayEquals from 'src/utils/arrayEquals';

interface SocketSettingsItemProps {
  socketObj: SocketItem;
  onChange: Function;
};

const parseLightModes = (modesStr: string | undefined) => modesStr?.length ? modesStr?.split('/').map(lightModeString => lightModeString.replace(/:/,';').split(';')) || [] : [];

const stringifyLightModes = (modesArr: string[][]) => (modesArr.length ? modesArr.map(mode => mode.join(':')).join('/') : '');

const SocketSettingsItem: FC<SocketSettingsItemProps> = ({ onChange, socketObj }) => {

  const [lightModeHour, setLightModeHour] = useState('');
  const [lightMode, setLightMode] = useState('1');

  const lightModes = parseLightModes(socketObj.lightModes);
  const [currentLightModes, setCurrentLightModes] = useState(lightModes);

  useEffect(() => {
    if (!arrayEquals(lightModes, currentLightModes)) {
      setCurrentLightModes(lightModes);
    }
  }, [currentLightModes, lightModes]);

  const handleUpdateSocket = (newValue: any) => {
    onChange({
      ...socketObj,
      ...newValue
    });
  };

  const handleAddLightMode = () => {
    const newMode = [lightMode, lightModeHour];
    if (lightModeHour.length && lightMode.length && !currentLightModes.some((mode) => arrayEquals(mode, newMode))) {
      handleUpdateSocket({ lightModes: stringifyLightModes([...currentLightModes, newMode]) });
    }
  };

  const handleDeleteLightMode = (modeToDelete: string[]) => {
    handleUpdateSocket({ lightModes: stringifyLightModes(currentLightModes.filter((mode: any) => mode !== modeToDelete)) });
  };
  
  return (
    <div className="socket-settings-item">
      <div className='socket-start-stop'>
        <div className="socket-switch">
          <div className="toggle-wrapper">
            <Toggle
              checked={socketObj.enabled}
              onClick={(val: boolean) => handleUpdateSocket({ enabled: val })}
            />
          </div>
          <span className='toggle-title'>{socketObj.name || socketObj.key}</span>
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
              {currentLightModes?.map((mode) =>
                <div
                  className='light-modes-row'
                  key={mode[0] + mode[1]}
                >
                  <span>
                    {mode[0]}
                  </span>
                  <span>
                    {mode[1]}
                  </span>
                  <span className='delete-light-mode'
                    onClick={() => handleDeleteLightMode(mode)}
                    role='img'
                    aria-label='delete-mode'
                  >
                    🗑️
                  </span>
                </div>
              )}
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
