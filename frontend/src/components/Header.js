import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { resetListProducts } from '../actions/productActions'

const Header = ({ setHeaderState, headerState }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const handleRedirect = (e) => {
    e.preventDefault()
    dispatch(resetListProducts())
    window.location.href = '/'
  }

  return (
    <header className="m-2 border rounded-xl bg-white">
      <div className="border-bottom py-3 px-4">
        <Link to="/"><img src={logo} alt="" style={{height: 'auto', width: '100%'}} /></Link>
      </div>
      <nav>
        <NavLink onClick={handleRedirect} activeClassName='nav-item-c-is-active' className="nav-item-c" to='/'>Productos</NavLink>
        <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/presupuestos'>Presupuestos</NavLink>
  {/*       <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/nota-de-entrega'>Notas De Entrega</NavLink> */}
     {/*    <NavLink activeClassName='nav-item-c-is-active' className="nav-item-c" to='/tiendas'>Tiendas</NavLink> */}
      </nav>
  
      <ListGroup className="m-2 quick-actions">
        <ListGroup.Item variant="flush">
          <h5 className="list-title"><small>Acciones Rápidas</small></h5>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to='/create-product' activeClassName='nav-item-c-is-active' className="btn btn-outline"><i className="im im-plus" style={{fontSize: '12px'}}></i> Producto</NavLink>
        </ListGroup.Item>
        
        <ListGroup.Item>
          <NavLink  to='/presupuesto/create' activeClassName='nav-item-c-is-active' className="btn btn-outline">
            <i className="im im-plus" style={{fontSize: '12px'}}></i> Presupuesto
          </NavLink>
        </ListGroup.Item>

{/*         <ListGroup.Item>
          <NavLink to='/nota-de-entrega/create' activeClassName='nav-item-c-is-active' className="btn btn-outline">
              <i className="im im-plus" style={{fontSize: '12px'}}></i> Nota De Entrega
            </NavLink>        </ListGroup.Item> */}
            
          <ListGroup.Item>
            <Button size="sm" variant="outline-primary" onClick={logoutHandler}>Cerrar Sesión</Button>
          </ListGroup.Item>
        </ListGroup>
      <div className="d-flex mx-4">
        <button onClick={()=>setHeaderState(!headerState)} className='btn btn-light border my-4'>
          {'<'}
        </button>
        <p className="mt-3 ml-2">
          <small>Logged as: 
            <span className="text-primary">{userInfo.name}</span>
          </small>
        </p>
      </div>
    </header>
  )
}

export default Header
