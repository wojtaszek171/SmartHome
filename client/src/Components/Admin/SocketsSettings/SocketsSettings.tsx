import * as React from 'react';
import { getSockets } from 'src/restService/restService';
import TextInput from '../../TextInput';
import Toggle from '../../Toggle';
import './SocketsSettings.scss';
import _ from 'lodash';

const { useState, useEffect } = React;

export const socketsConfig = {
    socket1: {
        key: 'socket1',
        start: '',
        stop: ''
    },
    socket2: {
        key: 'socket2',
        start: '',
        stop: ''
    },
    socket3: {
        key: 'socket3',
        start: '',
        stop: ''
    },
    socket4: {
        key: 'socket4',
        start: '',
        stop: ''
    }
};

const socketsNames: {[key: string]: string} = {
    socket1: 'Socket 1',
    socket2: 'Socket 2',
    socket3: 'Socket 3',
    socket4: 'Socket 4'
}

export interface SocketItem {
    key: string;
    enabled?: boolean;
    start?: string;
    stop?: string;
}

export interface SocketsObject {
    [index: string]: SocketItem
}

interface SocketsSettingsProps {
    onChange: Function;
};

const SocketsSettings: React.FC<SocketsSettingsProps> = ({ onChange }) => {

    const [socketsFromDB, setSocketsFromDB] = useState<SocketsObject>({...socketsConfig});
    const [socketsObject, setSocketsObject] = useState<SocketsObject>({...socketsConfig});

    useEffect(() => {
        fetchSockets();
    }, [])

    const fetchSockets = () => {
        getSockets().then(res => {      
            if (res && !res.message) {
                const socketsRes: SocketsObject = {...socketsConfig};

                res.forEach((socket: SocketItem) => {
                    socketsRes[socket.key] = {...socket};
                });

                setSocketsObject(socketsRes);
                setSocketsFromDB(socketsRes);
            }
        })
    }

    useEffect(() => {
        const changedSockets = _.reduce(socketsObject, (result: Array<SocketItem>, value, key) => {
            return _.isEqual(value, socketsFromDB[key]) ?
                result : result.concat(value);
        }, []);

        console.log(changedSockets);
        

        onChange(changedSockets);
    }, [socketsObject, socketsFromDB])

    const handleUpdateSocketEnabled = (socket: string, value: boolean) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            enabled: value
        };
        setSocketsObject(copySocketsObject);
    }

    const handleUpdateSocketStart = (socket: string, value: string) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            start: value
        };
        setSocketsObject(copySocketsObject);
    }

    const handleUpdateSocketEnd = (socket: string, value: string) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            stop: value
        };
        setSocketsObject(copySocketsObject);
    }

    console.log(socketsObject);
    
    return (
        <div className="sockets-settings">
            {Object.values(socketsConfig).map(({ key }) =>
                <div className="socket-item" key={key}>
                    <div className="socket-switch">
                        <span>{socketsNames[key]}</span>
                        <div className="toggle-wrapper">
                            <Toggle
                                checked={socketsObject[key] && socketsObject[key].enabled}
                                onClick={(val: boolean) => handleUpdateSocketEnabled(key, val)}
                            />
                        </div>
                    </div>
                    <div className="socket-inputs">
                        <TextInput
                            disabled={!(socketsObject[key] && socketsObject[key].enabled)}
                            label={'Start'}
                            value={socketsObject[key] && socketsObject[key].start}
                            type="time"
                            onChange={(val: string) => handleUpdateSocketStart(key, val)}
                        />
                        <TextInput
                            disabled={!(socketsObject[key] && socketsObject[key].enabled)}
                            label={'End'}
                            value={socketsObject[key] && socketsObject[key].stop}
                            type="time"
                            onChange={(val: string) => handleUpdateSocketEnd(key, val)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SocketsSettings;
