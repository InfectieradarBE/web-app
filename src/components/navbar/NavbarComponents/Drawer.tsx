import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isIOS, isMobile } from 'react-device-detect';
import { NavbarItemConfig } from '../../../types/config/navbar';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface DrawerProps {
  isAuth?: boolean;
  open: boolean;
  items: Array<NavbarItemConfig>;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const { t } = useTranslation(['navbar']);

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={props.open}
      onOpen={() => { }}
      onClose={props.onClose}
      disableBackdropTransition={!isIOS && isMobile}
      disableDiscovery={isIOS}
      classes={{
        paper: "bg-primary text-white py-2"
      }}
    >
      {props.items.map(item => {
        if (item.hideWhen === 'auth' && props.isAuth) {
          return null;
        }
        if (item.hideWhen === 'unauth' && !props.isAuth) {
          return null;
        }
        switch (item.type) {
          case 'internal':
            return <NavLink
              key={item.itemKey}
              className="nav-link px-3 py-1a"
              to={item.url}
              onClick={() => props.onClose()}
              activeClassName="bg-secondary"
              activeStyle={{
                fontWeight: "bold",
                color: "black"
              }}
              style={{
                minWidth: 250
              }}
            >
              {item.iconClass ?
                <i className={clsx(item.iconClass, 'me-1')}></i>
                : null}
              <span>{t(item.itemKey)}</span>
            </NavLink>
          case 'dialog':
            return <p key={item.itemKey}>todo: dialog opening</p>
          case 'dropdown':
            return <p key={item.itemKey}>todo: handledropdown</p>
          default:
            return <p>{item.itemKey}</p>

        }
      })}
    </SwipeableDrawer>
  );
};

export default Drawer;
