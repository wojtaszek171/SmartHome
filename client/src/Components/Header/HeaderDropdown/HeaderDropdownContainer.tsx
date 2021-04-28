import React, { FC } from 'react';
import HeaderDropdown from './HeaderDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstName, getLastName } from 'src/selectors/session';
import { clearSession, openAdmin } from 'src/reducers/session/session';

const HeaderDropdownContainer: FC = () => {
  const firstName = useSelector(getFirstName);
  const lastName = useSelector(getLastName);
  const dispatch = useDispatch();

  return (
    <HeaderDropdown
      name={`${firstName} ${lastName}`}
      clearSession={() => dispatch(clearSession())}
      openAdmin={(open: boolean) => dispatch(openAdmin(open))}
    />
  );
}

export default HeaderDropdownContainer;
