import React from 'react';
import { useDispatch } from 'react-redux'
import { openDialogWithoutPayload } from '../../store/dialogSlice';

import { useTranslation } from 'react-i18next';
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

  const handleNavigation = (url: string,) => {
    history.push(url)
  }
  if (props.loading || !props.content) {
    return <p>loading... </p>
  }
  return (
    <div  >
      <div className={backdrop ? 'BackdropIn' : 'BackdropOut'} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setBackdrop(false)}></div>

      <nav className="navbar navbar-expand-md navbar-dark bg-primary p-0">
        <div className="container">
          <div className="row " >

            <button className="navbar-toggler nav-link btn" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setBackdrop(true)}>
              <i className="fas fa-bars" ></i>
              <span className="navbar-text  ps-1 text-lightest ">Menu</span>
            </button>

            <div className="collapse navbar-collapse bg-primary" id="navbarSupportedContent" >
              <ul className="nav nav-tabs" >
                {props.content.items.map(
                  item =>
                    <NavbarItem
                      title={t(`${item.itemkey}.title`)}
                      iconClass={item.iconClass}
                      url={item.url}
                      onNavigate={handleNavigation}
                      hideWhen={item.hideWhen}
                      type={item.type}
                    />)}
              </ul>
            </div>
          </div>

          <div className="row">
            <ul className="nav nav-tabs justify-content-end  ">
              <li className="nav item">
                <button className="nav-link btn" onClick={() => dispatch(openDialogWithoutPayload("login"))} >Login</button>
              </li>
              <li className="nav item">
                <button className="nav-link btn " onClick={() => dispatch(openDialogWithoutPayload("signup"))} >Signup</button>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
