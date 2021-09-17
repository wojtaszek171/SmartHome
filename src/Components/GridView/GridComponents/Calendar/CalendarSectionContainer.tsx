import { Button } from 'pwojtaszko-design';
import React, { useEffect, useState } from 'react';
import CalendarSection from './CalendarSection';
import { setCookie, getCookie } from './cookieHelper';

const API_KEY = process.env.REACT_APP_G_API_KEY as string;
const SCOPES = process.env.REACT_APP_G_SCOPES;
const CLIENT_ID = process.env.REACT_APP_G_CLIENT_ID;

const CalendarSectionContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    gapi.client.setApiKey(API_KEY);
    gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES
    }).then(function(authResult) {  
      console.log('Google API initialized');
    });

    console.log(getCookie('g_tokens'));

  }, [])

  function authorize() {
    var auth2 = gapi.auth2.getAuthInstance();
    var user = auth2.currentUser.get();
    console.log(user.getBasicProfile().getEmail());
    
    if (user.isSignedIn()) {
      getEvents();
    } else {
      auth2.signIn().then(getEvents);
    }
  }

  function addUser(){
    var auth2 = gapi.auth2.getAuthInstance();
    var user = auth2.currentUser.get();
    console.log(JSON.stringify(user.getAuthResponse()));
    
    setCookie('g_tokens', addTokenCookie(user.getAuthResponse().access_token), 365);

    auth2.signIn({
      prompt: 'select_account'
    }).then(getEvents);
  }

  const addTokenCookie = (newToken: string) => {
    const gCookie = getCookie('g_tokens');
    if(gCookie.length) {
      const gCookiesArray = JSON.parse(gCookie);
      const foundIndex = gCookiesArray.findIndex((token: string) => token === newToken);

      if (foundIndex !== -1) {
        return gCookie;
      } else {
        gCookiesArray.push(newToken);
        return JSON.stringify(gCookiesArray);
      }
    } else {
      return JSON.stringify([newToken]);
    }
  }

  const getEvents = () => {

  }

  return (
    // <CalendarSection />
    <div>
      {/* {events.map((event: any) => `${event.summary} ${event.start.dateTime} - ${event.end.dateTime}`
        )
      } */}
      <Button
        text={'Try'}
        handleClick={authorize}
      />
      <Button
        text={'Add'}
        handleClick={addUser}
      />
    </div>
  );
}

export default CalendarSectionContainer;
