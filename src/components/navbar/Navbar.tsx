import React from 'react';

interface NavbarProps {
    onOpenExternalPage: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [layer, setLayer] = React.useState(false);
    return (
      <div >

        <div className={layer?'layerIn':'layerOut'} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setLayer(false)}></div>

        <nav className="navbar navbar-expand-md navbar-dark bg-primary p-0">
          <div className="container" >

            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setLayer(true)}>
                <span className="navbar-toggler-icon  " ></span>
                <span className="navbar-text  ms-1 text-lightest ">Menu</span>
            </button>


            <div className="collapse navbar-collapse bg-primary" id="navbarSupportedContent" >
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <button className="btn btn-primary text-lightest fs-btn" type = "button"   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                            </svg>
                        Home
                    </button>
                    </li>
                    <li className="nav-item" >
                        <button className="btn btn-primary text-lightest fs-btn " type = "button" >Current Results</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-primary text-lightest fs-btn " type = "button">About Case</button>
                    </li>
                    <li className="nav-item ">
                        <button className="btn btn-primary text-lightest fs-btn " type = "button">FAQ</button>
                    </li>
                </ul>
            </div>

            <div id = "AuthenticationWrapper">
              {isAuth?
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle text-lightest fs-btn "
                    type="button"
                    id="DropMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle pe-1" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    m****l@example.com
                  </button>
                  <div className = "dropdown-menu dropdown-menu-end ">
                    <button className="dropdown-item text-center" type = "button" >Settings
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear-fill ps-1 " viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                      </svg>
                    </button>
                    <button className="dropdown-item text-center" type = "button" onClick={() => setIsAuth(false)}>Logout
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-in-right ps-1 " viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>

              :

                <div >
                  <ul className="list-group list-group-horizontal">
                    <li className="nav item">
                      <button className="btn btn-primary text-lightest fs-btn " type = "button" onClick={() => setIsAuth(true)}>Login</button>
                    </li>
                    <li className="nav item">
                      <button className="btn btn-primary text-lightest fs-btn " type = "button"  >Signup</button>
                    </li>
                  </ul>
                </div>

              }
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Navbar;
