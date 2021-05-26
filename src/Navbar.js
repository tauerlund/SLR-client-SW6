import React, { useState } from "react";
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavbarLinks = () => {
  
  return (

    <div>
      <Navbar className="color-nav" expand="lg">
        <LinkContainer to="/">
        <Navbar.Brand><h5 className="logoText">Danish Sign Language Translation & Learning</h5></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link><h5 className="whiteText">Home</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/translation">
            <Nav.Link><h5 className="whiteText">Translation</h5></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Quiz">
            <Nav.Link><h5 className="whiteText">Quiz</h5></Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarLinks;