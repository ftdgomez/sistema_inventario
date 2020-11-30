import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="card p-4 rounded-xl">{children}</div>
    </Container>
  )
}

export default FormContainer
