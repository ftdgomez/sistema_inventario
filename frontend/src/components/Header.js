import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className="m-2 border rounded-xl bg-white">
      <div className="border-bottom py-3 px-4">
        <Link to="/"><img src={logo} alt="" style={{height: 'auto', width: '100%'}} /></Link>
      </div>
      <nav>
        <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/'>Productos</NavLink>
      {/*   <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/categorias'>Categorias</NavLink> */}
        <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/notas-de-entrega'>Notas De Entrega</NavLink>
        <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/tiendas'>Tiendas</NavLink>
      </nav>
  
      <ListGroup className="m-2 quick-actions">
        <ListGroup.Item variant="flush">
          <h5 className="list-title"><small>Acciones Rápidas</small></h5>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="block" className="text-left"><i className="im im-plus" style={{fontSize: '12px'}}></i> Productos</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="block" className="text-left"><i className="im im-plus" style={{fontSize: '12px'}}></i> Presupuesto</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="block" className="text-left"><i className="im im-plus" style={{fontSize: '12px'}}></i> Nota de entrega</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button size="sm" variant="outline-primary" onClick={logoutHandler}>Cerrar Sesión</Button>
        </ListGroup.Item>
      </ListGroup>
    </header>
  )
}

export default Header
