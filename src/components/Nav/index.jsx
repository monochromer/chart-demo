import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => {
  return (
    <nav className="Nav">
      { props.children }
    </nav>
  )
}

const Link = ({ children, ...restProps }) => {
  return (
    <NavLink
      className="Nav-Link"
      activeClassName="Nav-Link_active"
      {...restProps}
    >
      {children}
    </NavLink>
  )
}

Nav.Link = Link;

export default Nav;