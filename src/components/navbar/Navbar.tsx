import React from 'react';
import { useDispatch } from 'react-redux'
import { openDialogWithoutPayload} from '../../store/dialogSlice';
interface NavbarProps {
    onOpenExternalPage: (url: string) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const dispatch = useDispatch();
  const [backdrop, setBackdrop] = React.useState(false);
    return (
      <div  >

        <div className={backdrop?'BackdropIn':'BackdropOut'} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setBackdrop(false)}></div>

        <nav className="navbar navbar-expand-md navbar-dark bg-primary p-0">
          <div className="container">
            <div className="row " >

              <button className="navbar-toggler nav-link btn"  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setBackdrop(true)}>
                  <span className="navbar-toggler-icon  " ></span>
                  <span className="navbar-text  ps-1 text-lightest ">Menu</span>
              </button>

              <div className="collapse navbar-collapse bg-primary" id="navbarSupportedContent" >
                <ul className="nav nav-tabs" >
                  <li className="nav-item" >
                    <button className="nav-link active btn" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                    </svg>Home</button>
                  </li>
                  <li className="nav-item ">
                    <button className="nav-link btn"  >Current Results</button>
                  </li>
                  <li className="nav-item" >
                    <button className="nav-link btn" >About CASE</button>
                  </li>
                  <li className="nav-item" >
                    <button className="nav-link btn" >FAQ</button>
                  </li>
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
