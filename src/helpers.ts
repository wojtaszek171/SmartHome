export const isDev = (): boolean => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

export const getCookie = (cname: string): string => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
}

export const eraseCookie = (name: string): void => {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
