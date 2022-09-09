import React, { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openAdmin } from 'src/reducers/session/session';
import { getIsAdminOpen } from 'src/selectors/session';
import SideMenu from './SideMenu';

interface SideMenuContainerProps {
  children: ReactElement;
}

const SideMenuContainer: FC<SideMenuContainerProps> = ({ children }) => {

  const isOpen = useSelector(getIsAdminOpen);
  const dispatch = useDispatch();

  return (
    <SideMenu
      isOpen={isOpen}
      onExpand={(open: boolean) => dispatch(openAdmin(open))}
    >
      {children}
    </SideMenu>
  );
};

export default SideMenuContainer;
