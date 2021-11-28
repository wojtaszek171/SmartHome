import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { socketsConfig } from './socketsConfig';
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
  socketsFromDB: SocketsObject;
  onChange: Function;
};

const SocketsSettings: FC<SocketsSettingsProps> = ({ onChange, socketsFromDB }) => {

  const [socketsObject, setSocketsObject] = useState<SocketsObject>({ ...socketsConfig });

  useEffect(() => {
    setSocketsObject({ ...socketsFromDB })
  }, [socketsFromDB]);

  useEffect(() => {
    const changedSockets = _.reduce(socketsObject, (result: Array<SocketItem>, value, key) => {
      return _.isEqual(value, socketsFromDB[key]) ?
        result : result.concat(value);
    }, []);

    onChange(changedSockets);
  }, [socketsObject]);

  const handleSocketUpdate = (socketObj: SocketItem) => {
    console.log({
      ...socketsObject,
      [socketObj.key]: {
        ...socketObj
      }
    });
    
    setSocketsObject((prevObj) => ({
      ...prevObj,
      [socketObj.key]: {
        ...socketObj
      }
    }));
  };

  return (
    <div className="sockets-settings">
      {Object.values(socketsConfig).map(({ key }) =>
        <SocketSettingsItem
          socketObj={socketsObject[key]}
          onChange={handleSocketUpdate}
          key={key}
        />
      )}
    </div>
  );
}

export default SocketsSettings;
