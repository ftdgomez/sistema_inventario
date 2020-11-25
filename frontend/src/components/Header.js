import React from 'react'
import {Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../assets/icon.png'

const Header = () => {
  return (
    <Navbar className="border-bottom mb-4" bg="light" expand="lg">
      <Navbar.Brand href="#home"><img style={{maxWidth: '38px', height: 'auto', width: '100%'}} src={logo} alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Button variant="primary" size="sm">Crear Presupuesto</Button>
          <span className="mx-2"></span>
          <Button variant="secondary" size="sm">Notas de entrega</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
