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
  const loggedInUser = useSelector((state: RootState) => state.user.currentUser.account);

  const [drawerOpen, setDrawerOpen] = useState(false);

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
            {isLoggedIn ?
              <div className="dropdown nav-tabs">
                <button
                  className="btn btn-primary dropdown-toggle text-lightest fs-btn "
                  type="button"
                  id="DropMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className={clsx('fas fa-user', 'me-1')}></i>
                  {loggedInUser.accountId}
                </button>
                <div className="dropdown-menu dropdown-menu-end ">
                  <button className="dropdown-item text-center" type="button" >
                    {t(`${'userDropdown'}.settings`)}
                    <i className={clsx('fas fa-cog', 'ms-1')}></i>
                  </button>
                  <button className="dropdown-item text-center" onClick={() => logout()} >
                    {t(`${'userDropdown'}.logout`)}
                    <i className={clsx('fas fa-sign-out-alt', 'ms-1')}></i>
                  </button>
                </div>
              </div>
              :
              <div className="row">
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
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
