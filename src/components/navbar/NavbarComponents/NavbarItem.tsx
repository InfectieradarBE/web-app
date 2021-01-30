import React from 'react';
import clsx from 'clsx';
import { NavLink} from 'react-router-dom'


interface NavbarItemProps {
  title:string;
  iconClass?: string;
  url: string;
  onNavigate: (url: string) => void;
  hideWhen?: string;
  type: string;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  return(
    <li className="nav-item" >
      <NavLink className="nav-link" to={props.url}
        onClick ={() => props.onNavigate(props.url)}
        activeStyle={{
          fontWeight: "bold",
          color: "black"
        }}  >
        {props.iconClass ?
          <i className={clsx('fas fa-home', 'me-1')}></i>
          :null}
        <span>{props.title}</span></NavLink>
      </li>
  )
};

export default NavbarItem;
