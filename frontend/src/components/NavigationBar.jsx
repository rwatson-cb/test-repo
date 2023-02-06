import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
  return (
      <nav>
        <ul>
          <li>
            {/* <a href="/">Home</a> */}
            <NavLink to="/"  >Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" >About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" >Contact</NavLink>
          </li>
          <li>
            <NavLink to="/blog" >Blog</NavLink>
          </li>
          <li>
            <NavLink to="/api" >API</NavLink>
          </li>
        </ul>
      </nav>
  );
}
