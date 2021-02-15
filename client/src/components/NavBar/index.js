import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
    return (
      <Navbar className="bg-light">
        <Navbar.Brand href="/">TEST</Navbar.Brand>
        <Nav className="mr-auto">
            {/* <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/saved">Saved</Nav.Link> */}
        </Nav>
      </Navbar>
    );
  }
  
  export default NavBar;