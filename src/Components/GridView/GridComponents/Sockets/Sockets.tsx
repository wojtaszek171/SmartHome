import React, { FC } from 'react';
import { SocketItem } from 'src/Components/Admin/SocketsSettings/SocketsSettings';
import SocketItemComponent from './SocketItem';
import './Sockets.scss';

interface SocketsProps {
  socketsSettings: Array<SocketItem>;
}

const Sockets: FC<SocketsProps> = ({ socketsSettings }) => {

  return (
    <div className='sockets-component'>
      {socketsSettings.map((socket =>
        <SocketItemComponent
          {...socket}
          name={socket.key}
        />
      ))}
    </div>
  );
}

export default Sockets;
