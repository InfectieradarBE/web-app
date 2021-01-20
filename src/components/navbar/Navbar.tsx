import React from 'react';
import './navbar.css'

interface NavbarProps {
    onOpenExternalPage: (url: string) => void;
}


const Navbar: React.FC<NavbarProps> = (props) => {
   
    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container-fluid">

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon  " ></span>
                <span className="navbar-text  ms-1 text-lightest ">Menu</span>
            </button>
            
    
            <div className="collapse navbar-collapse bg-primary" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <a className="nav-link text-lightest " aria-current="page" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 20 20">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                            </svg>
                            Home
                        </a>              
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-lightest" aria-current="page" href="#">Current Results</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-lightest" aria-current="page" href="#">About Case</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link text-lightest " aria-current="page" href="#">FAQ</a>
                    </li>
                </ul>
            </div>


            <div >
                <ul className="list-group list-group-horizontal">
                    <li className="nav item">
                        <a className="nav-link text-lightest " aria-current="page" href="#">Login</a>
                    </li>
                    <li className="nav item">
                        <a className="nav-link text-lightest " aria-current="page" href="#">Signup</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;
