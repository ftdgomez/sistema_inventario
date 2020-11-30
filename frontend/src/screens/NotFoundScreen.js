import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
      <div className="text-center">
        En construcción. <br />
        <Link to="/">Volver</Link>
      </div>
    </div>
  )
}

export default NotFoundScreen
