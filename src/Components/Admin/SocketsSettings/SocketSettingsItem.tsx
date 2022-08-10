import React, { FC, useEffect, useState } from 'react';
import { Button, Input, Select, Toggle } from 'pwojtaszko-design';
import { SocketItem } from './SocketsSettings';
import Collapse from 'src/Components/Collapse';
import arrayEquals from 'src/utils/arrayEquals';

interface SocketSettingsItemProps {
  socketObj: SocketItem;
  onChange: Function;
};

const lightModesTitles = ['off', 'on', 'evening (Aquael)', 'night (Aquael)'];

const parseLightModes = (modesStr: string | undefined) => modesStr?.length ? modesStr?.split('/').map(lightModeString => lightModeString.replace(/:/,';').split(';')) || [] : [];

const stringifyLightModes = (modesArr: string[][]) => (modesArr.length ? modesArr.map(mode => mode.join(':')).join('/') : '');

const SocketSettingsItem: FC<SocketSettingsItemProps> = ({ onChange, socketObj }) => {

  const [lightModeHour, setLightModeHour] = useState('');
  const [lightMode, setLightMode] = useState('0');

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
      const sortedLightModes = [...currentLightModes, newMode].sort((a, b) => {
        var time1 = parseFloat(a[1].replace(':','.').replace(/[^\d.-]/g, ''));
        var time2 = parseFloat(b[1].replace(':','.').replace(/[^\d.-]/g, ''));
        if (time1 < time2) return -1;
        if (time1 > time2) return 1;
        return 0;
      } );
      
      handleUpdateSocket({ lightModes: stringifyLightModes(sortedLightModes) });
    }
  };

  const handleDeleteLightMode = (modeToDelete: string[]) => {
    handleUpdateSocket({ lightModes: stringifyLightModes(currentLightModes.filter((mode: any) => mode[1] !== modeToDelete[1])) });
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
        <div className='socket-advanced'>
          <>
            <span>Light modes</span>
            <div className='light-modes-list'>
              <div className='light-modes-row'>
                <span>MODE</span>
                <span>ENABLE HOUR</span>
              </div>
              {currentLightModes?.map(([lmode, lhour]) =>
                <div
                  className='light-modes-row'
                  key={lmode + lhour}
                >
                  <span>
                    {lightModesTitles[Number(lmode)]}
                  </span>
                  <span>
                    {lhour}
                  </span>
                  <span className='delete-light-mode'
                    onClick={() => handleDeleteLightMode([lmode, lhour])}
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
                    key: '0',
                    item: lightModesTitles[0]
                  },
                  {
                    key: '1',
                    item: lightModesTitles[1]
                  },
                  {
                    key: '2',
                    item: lightModesTitles[2]
                  },
                  {
                    key: '3',
                    item: lightModesTitles[3]
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
        </div>      
    </div>
  );
}

export default SocketSettingsItem;
