import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';
import { socketsConfig } from './socketsConfig';
import SocketsSettings from './SocketsSettings';

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

interface SocketsSettingsContainerProps {
  socketsFromDB: SocketsObject;
  onChange: Function;
};

const SocketsSettingsContainer: FC<SocketsSettingsContainerProps> = ({ onChange, socketsFromDB }) => {

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

    setSocketsObject((prevObj) => ({
      ...prevObj,
      [socketObj.key]: {
        ...socketObj
      }
    }));
  };

  return (
    <SocketsSettings
      onChange={handleSocketUpdate}
      socketsObject={socketsObject}
      socketsConfigValues={Object.values(socketsConfig)}
    />
  );
}

export default SocketsSettingsContainer;
