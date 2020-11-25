import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 160px)'}}>
      <Spinner variant="primary" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
