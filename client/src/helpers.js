export const isDev = () => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

export const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const eraseCookie = (name) => {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
