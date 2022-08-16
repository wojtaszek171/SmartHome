export const parseLightModes = (modesStr: string | undefined) => modesStr?.length ? modesStr?.split('/').map(lightModeString => lightModeString.replace(/:/,';').split(';')) || [] : [];

export const stringifyLightModes = (modesArr: string[][]) => (modesArr.length ? modesArr.map(mode => mode.join(':')).join('/') : '');
