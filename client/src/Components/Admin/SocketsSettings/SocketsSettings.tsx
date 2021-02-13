import * as React from 'react';
import TextInput from '../../TextInput';
import Toggle from '../../Toggle';

const { useState, useEffect } = React;

const sockets = [
    {
        name: 'Socket 1',
        key: 'socket1'
    },
    {
        name: 'Socket 2',
        key: 'socket2'
    },
    {
        name: 'Socket 3',
        key: 'socket3'
    },
    {
        name: 'Socket 4',
        key: 'socket4'
    }
];

interface SocketItem {
    enabled?: boolean;
    start?: Date;
    end?: Date;
}

interface SocketsObject {
    [index: string]: SocketItem
}

interface SocketsSettingsProps {
    onChange: Function;
};

const SocketsSettings: React.FC<SocketsSettingsProps> = ({ onChange }) => {

    const [socketsObject, setSocketsObject] = useState<SocketsObject>({});

    useEffect(() => {
        onChange(socketsObject);
    }, [socketsObject])

    const handleUpdateSocketEnabled = (socket: string, value: boolean) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            enabled: value
        };
        setSocketsObject(copySocketsObject);
    }

    const handleUpdateSocketStart = (socket: string, value: Date) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            start: value
        };
        setSocketsObject(copySocketsObject);
    }

    const handleUpdateSocketEnd = (socket: string, value: Date) => {
        let copySocketsObject = {...socketsObject};
        copySocketsObject[socket] = {
            ...copySocketsObject[socket],
            end: value
        };
        setSocketsObject(copySocketsObject);
    }

    return (
        <div className="sockets">
            {sockets.map(({ key, name }) =>
                <div className="socket-item" key={key}>
                    <div className="socket-switch">
                        <span>{name}</span>
                        <div className="toggle-wrapper">
                            <Toggle
                                checked={socketsObject[key] && socketsObject[key].enabled}
                                onClick={(val: boolean) => handleUpdateSocketEnabled(key, val)}
                            />
                        </div>
                    </div>
                    <TextInput
                        disabled={!(socketsObject[key] && socketsObject[key].enabled)}
                        label={'Start'}
                        value={socketsObject[key] && socketsObject[key].start}
                        type="date"
                        onChange={(val: Date) => handleUpdateSocketStart(key, val)}
                    />
                    <TextInput
                        disabled={!(socketsObject[key] && socketsObject[key].enabled)}
                        label={'End'}
                        value={socketsObject[key] && socketsObject[key].end}
                        type="date"
                        onChange={(val: Date) => handleUpdateSocketEnd(key, val)}
                    />
                </div>
            )}
        </div>
    );
}

export default SocketsSettings;
