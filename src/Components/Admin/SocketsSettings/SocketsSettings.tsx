import React, { FC } from 'react';
import SocketSettingsItem from './SocketSettingsItem';
import './SocketsSettings.scss';

export interface SocketItem {
  key: string;
  name: string;
  enabled: boolean;
  start: string;
  stop: string;
  lightModes?: string;
}

export interface SocketsObject {
  [index: string]: SocketItem
}

interface SocketsSettingsProps {
  socketsConfigValues: SocketItem[];
  socketsObject: SocketsObject;
  onChange: Function;
}

const SocketsSettings: FC<SocketsSettingsProps> = ({ socketsObject, socketsConfigValues, onChange }) => {

  return (
    <div className='sockets-settings'>
      {socketsConfigValues.map(({ key }) =>
        <SocketSettingsItem
          socketObj={socketsObject[key]}
          onChange={onChange}
          key={key}
        />
      )}
    </div>
  );
}

export default SocketsSettings;
