import React, { FC } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { getAuthToken, getFirstName } from 'src/selectors/session';

const HeaderContainer: FC = () => {
  const authToken = useSelector(getAuthToken);
  const firstName = useSelector(getFirstName);

  return (
    <Header
      authToken={authToken}
      firstName={firstName}
    />
  );
}

export default HeaderContainer;
