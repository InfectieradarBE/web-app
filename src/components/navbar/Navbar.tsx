import React from 'react';
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

interface NavbarProps {
  loading?: boolean;
  content?: NavbarConfig;
  onOpenExternalPage: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { t } = useTranslation(['navbar']);
  const history = useHistory();
  const dispatch = useDispatch();
  const [backdrop, setBackdrop] = React.useState(false);
  const isLoggedIn = useIsAuthenticated();
  const logout = useLogout();
  const loggedInUser = useSelector((state: RootState) => state.user.currentUser.account);

  const handleNavigation = (url: string, backdrop: boolean) => {
    history.push(url);
    setBackdrop(backdrop);
  }

  if (props.loading || !props.content) {
    return <p>loading... </p>
  }

  return (
    <div>
      <div className={backdrop ? 'BackdropIn' : 'BackdropOut'} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setBackdrop(false)}></div>

      <nav className="navbar navbar-expand-lg  bg-primary p-0">
        <div className="container">
          <div className="row " >

            <button className="navbar-toggler nav-link btn" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setBackdrop(true)}>
              <i className="fas fa-bars" ></i>
              <span className="navbar-text  ps-1 text-lightest ">Menu</span>
            </button>

            <div className="collapse navbar-collapse bg-primary no-transition" id="navbarSupportedContent" >
              <ul className="nav nav-tabs" >
                {props.content.items.map(
                  item =>
                    <NavbarItem
                      key={item.itemkey}
                      itemkey={item.itemkey}
                      title={t(`${item.itemkey}`)}
                      iconClass={item.iconClass}
                      url={item.url}
                      onNavigate={handleNavigation}
                      hideWhen={item.hideWhen}
                      type={item.type}
                      dropdownItems={item.dropdownItems}
                    />)}
              </ul>
            </div>
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
  );
};

export default Navbar;
