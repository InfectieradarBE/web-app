import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom'
import { useIsAuthenticated } from '../../../hooks/useIsAuthenticated';
import { useTranslation } from 'react-i18next';
import DropdownItem from './DropdownItem'
import { useHistory } from 'react-router-dom';
import { NavbarItemConfig } from '../../../types/config/navbar';


interface NavbarItemProps {
  itemkey: string;
  title: string;
  iconClass?: string;
  url: string;
  onNavigate: (url: string, backdrop: boolean) => void;
  hideWhen?: string;
  type: string;
  dropdownItems?: Array<NavbarItemConfig>
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  const collapseOnlyMobile = window.outerWidth < 992;
  const history = useHistory();
  const { t } = useTranslation(['navbar']);
  const isLoggedIn = useIsAuthenticated();
  const handleNavigation = (url: string) => {
    history.push(url)
  }

  return (
    <div className="nav-item">
      {(isLoggedIn === false && props.hideWhen === 'unauth') || (isLoggedIn === true && props.hideWhen === 'auth') ?
        null
        :
        (props.type === 'internal') ?
          <li className="nav-item " >
            <NavLink className="nav-link" to={props.url}
              data-bs-toggle={collapseOnlyMobile ? "collapse" : null} data-bs-target="#navbarSupportedContent"
              onClick={() => props.onNavigate(props.url, false)}
              activeStyle={{
                fontWeight: "bold",
                color: "black"
              }}>
              {props.iconClass ?
                <i className={clsx(props.iconClass, 'me-1')}></i>
                : null}
              <span>{props.title}</span>
            </NavLink>
          </li>
          :
          <li className="dropdown nav-item">
            <button
              className="customDropDown btn btn-primary dropdown-toggle text-lightest fs-btn "
              type="button"
              id="DropMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              {props.iconClass ?
                <i className={clsx(props.iconClass, 'me-1')}></i>
                : null}
              {t(`${props.itemkey}.title`)}
            </button>
            <div className="dropdown-menu dropdown-menu-end ">
              {props.dropdownItems!.slice(0).map(
                item =>
                  <DropdownItem
                    key={item.itemKey}
                    title={t(`${props.itemkey}.${item.itemKey}`)}
                    itemkey={item.itemKey}
                    iconClass={item.iconClass}
                    url={item.url}
                    onNavigate={handleNavigation}
                  />)}
            </div>
          </li>
      }
    </div>
  )
};

export default NavbarItem;
