import React, { useState } from "react";
import { NavLink as RRNavLink, Route } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";
import Login from "../modules/Login";
import FoodDisplay from "./FoodDisplay";
import  "../css/styleSheet.css"

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && <></>}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem >
                  <a
                    aria-current="page"
                    className="nav-link"
                    
                    onClick={logout}
                   
                  >
                    Logout
                  </a>
                </NavItem>
                <Route path="/FoodSchedule" exact>
                  <FoodDisplay />
                </Route>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} class="login" to="/login" >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} class="register"to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
