import React, { FC, useEffect, useState } from 'react';
import { Button, Input, Select, Toggle } from 'pwojtaszko-design';
import { useTranslation } from 'react-i18next';
import i18nInstance from 'src/i18n/i18nInstance';
import arrayEquals from 'src/utils/arrayEquals';
import { parseLightModes, stringifyLightModes } from 'src/utils/lightModes';
import { SocketItem } from './SocketsSettings';

interface SocketSettingsItemProps {
  socketObj: SocketItem;
  onChange: Function;
}

const lightModesTitles = ['off', 'on', 'eveningAquael', 'nightAquael'];

const SocketSettingsItem: FC<SocketSettingsItemProps> = ({ onChange, socketObj }) => {
  const [lightModeHour, setLightModeHour] = useState('');
  const [lightMode, setLightMode] = useState('0');
  const lightModes = parseLightModes(socketObj.lightModes);
  const [currentLightModes, setCurrentLightModes] = useState(lightModes);
  const { t } = useTranslation('common', { i18n: i18nInstance });

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
        const time1 = parseFloat(a[1].replace(':','.').replace(/[^\d.-]/g, ''));
        const time2 = parseFloat(b[1].replace(':','.').replace(/[^\d.-]/g, ''));
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
    <div className='socket-settings-item'>
      <div className='socket-start-stop'>
        <div className='socket-switch'>
          <div className='toggle-wrapper'>
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
            <span>{t('socketModes')}</span>
            <div className='light-modes-list'>
              <div className='light-modes-row'>
                <span>{t('mode')}</span>
                <span>{t('enableHour')}</span>
              </div>
              {currentLightModes?.map(([lmode, lhour]) =>
                <div
                  className='light-modes-row'
                  key={lmode + lhour}
                >
                  <span>
                    {t(lightModesTitles[Number(lmode)])}
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
                <span>{t('mode')}</span>
                <Select
                  options={lightModesTitles.map((title, i) => ({
                    key: `${i}`,
                    item: t(title)
                  }))}
                  onChange={setLightMode}
                />
              </div>
              <Input
                label={t('enableHour')}
                value={lightModeHour}
                type='time'
                onChange={setLightModeHour}
              />
              <Button
                text='+'
                onClick={handleAddLightMode}
              />
            </div>
          </>
        </div>      
    </div>
  );
}

export default SocketSettingsItem;
