import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (

    <div>
            <NavLink className="navbar-item" activeClassName="is-active" to="/">
              Home
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/translation"
            >
              Translation
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/quiz"
            >
              Quiz
            </NavLink>
    </div>

  );
};

export default Navbar;