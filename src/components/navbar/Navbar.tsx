import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { openDialogWithoutPayload } from '../../store/dialogSlice';
import clsx from 'clsx';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';
import { useLogout } from '../../hooks/useLogout';
import { useHistory } from 'react-router-dom';
import { NavbarConfig } from '../../types/config/navbar'
import NavbarItem from './NavbarComponents/NavbarItem'
import Drawer from './NavbarComponents/Drawer';
import { Profile } from '../../api/types/user';

interface NavbarProps {
  loading?: boolean;
  content?: NavbarConfig;
  onOpenExternalPage: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { t } = useTranslation(['navbar']);
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useIsAuthenticated();
  const logout = useLogout();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const profileList = useSelector((state: RootState) => state.user.currentUser.profiles);
  const currentProfile: Profile | undefined = profileList.find((profile: Profile) => profile.mainProfile === true);


  const handleNavigation = (url: string, backdrop: boolean) => {
    history.push(url);
  }

  if (props.loading || !props.content) {
    return <p>loading... </p>
  }

  const breakpoint = props.content.breakpoint ? props.content.breakpoint : 'md';

  const normalLeftNav = <React.Fragment>
    <button className="navbar-toggler nav-link btn h-100" onClick={() => setDrawerOpen(true)}>
      <i className="fas fa-bars" ></i>
      <span className="navbar-text  ps-1 text-white ">Menu</span>
    </button>
    <div className="collapse navbar-collapse bg-primary no-transition" id="navbarSupportedContent" >
      <ul className="nav nav-tabs" >
        {props.content.leftItems.map(
          item =>
            <NavbarItem
              key={item.itemKey}
              itemkey={item.itemKey}
              title={t(`${item.itemKey}`)}
              iconClass={item.iconClass}
              url={item.url}
              onNavigate={handleNavigation}
              hideWhen={item.hideWhen}
              type={item.type}
              dropdownItems={item.dropdownItems}
            />)}
      </ul>
    </div>
  </React.Fragment>

  const navbarLeft = () => {
    return normalLeftNav
  }

  const navbarRight = () => {
    if (isLoggedIn) {
      return <div className="dropdown nav-tabs">
        <button
          className="btn btn-primary dropdown-toggle text-lightest fs-btn "
          type="button"
          id="DropMenu"
          data-bs-toggle="dropdown"
          aria-expanded="false" >
          <i className={clsx('fas fa-user', 'me-1')}></i>
          {currentProfile?.alias}
        </button >

        <div className="dropdown-menu dropdown-menu-end text-end ">
          {
            props.content?.rightItems.map(item =>
              <button
                key={item.itemKey}
                className="dropdown-item" type="button"
                onClick={() => {
                  history.push(item.url);
                }}
              >
                {t(`rightMenu.${item.itemKey}`)}
                <i className={clsx(item.iconClass, 'ms-1')}></i>
              </button>
            )
          }

          <button
            className="dropdown-item"
            onClick={() => logout()} >
            {t(`rightMenu.logout`)}
            <i className={clsx('fas fa-sign-out-alt', 'ms-1')}></i>
          </button>
        </div>
      </div>
    }
    return <div className="row">
      <ul className="nav nav-tabs justify-content-end  ">
        <li className="nav item">
          <button className="nav-link btn" onClick={() => dispatch(openDialogWithoutPayload("login"))} >{t(`${'login'}`)}</button>
        </li>
        <li className="nav item">
          <button className="nav-link btn " onClick={() => dispatch(openDialogWithoutPayload("signup"))} >{t(`${'signup'}`)}</button>
        </li>
      </ul>
    </div>
  }

  return (
    <React.Fragment>
      <div className={`d-block d-${breakpoint}-none`}>
        <Drawer
          isAuth={isLoggedIn}
          open={drawerOpen}
          items={props.content.leftItems}
          onClose={() => { setDrawerOpen(false) }}
        />
      </div>
      <div>
        <nav className={`navbar navbar-expand-${breakpoint}  bg-primary p-0`}>
          <div className="container">
            <div className="row" >
              {navbarLeft()}
            </div>
            {navbarRight()}
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
