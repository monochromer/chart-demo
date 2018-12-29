import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

const Logo = ({ className }) => {
  return (
    <Link className={`Logo ${className}`} to='/'>logo</Link>
  )
}

export default Logo;