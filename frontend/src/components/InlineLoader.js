import React from 'react'
import {Spinner} from 'react-bootstrap'
const InlineLoader = () => {
  return (
    <div className="">
      <Spinner variant="primary" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}

export default InlineLoader
