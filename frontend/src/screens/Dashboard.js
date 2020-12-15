import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
const Dashboard = ({history}) => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(()=>{
    if (!userInfo || !userInfo.isStore) {
      history.push('/login')
    }
  }, [userInfo, history])
  
  if (!userInfo)
  {
    return <p>...</p>
  }
  return (
    <div className="bg-cool">
      <div className="bg-white d-flex justify-content-center border-bottom border py-2 px-4 w-100 fixed-top">
        <img style={{maxWidth: '140px', height: 'auto'}} src={logo} />
      </div>
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
        {userInfo.isAdmin && <p className="text-center">Logeado como Super Administrador</p>}
        <p className="text-muted">Acciones Rápidas</p>
        <div className="d-sm-block d-md-flex align-items-center justify-content-center dashboard-c">
          <Link to="/create-product" className="card p-4 rounded-xl shadow-sm mx-2">Crear Producto</Link>
          <Link to="/create/invoice" className="card p-4 rounded-xl shadow-sm mx-2">Crear Nota De Entrega</Link>
          <Link to="/create/presupuesto" className="card p-4 rounded-xl shadow-sm mx-2">Crear Presupuesto</Link>
        </div>
        <p className="text-muted mt-4">Ir a vista:</p>
        <div className="d-sm-block d-md-flex align-items-center justify-content-center dashboard-c">
          <Link to="/productos" className="card p-4 rounded-xl shadow-sm mx-2">Ver Todos Los Productos</Link>
          <Link to="/list/invoices" className="card p-4 rounded-xl shadow-sm mx-2">Ver Todas Las Notas De Entrega</Link>
          <Link to="/list/presupuestos" className="card p-4 rounded-xl shadow-sm mx-2">Ver Todos Los Presupuestos</Link>
        </div>
        <p className="text-muted m-2 p-2 bg-white fixed-bottom"><small>Versión 1.0.0</small></p>
      </div>
    </div>
  )
}

export default Dashboard
