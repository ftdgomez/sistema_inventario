import React, { useState } from 'react'
import {Form, Button, Col } from 'react-bootstrap'

const Searchbar = ({ history, params, keyword }) => {

  const [keyName, setKeyName] = useState('name') 

  const [formKeyword, setFormKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const url = `/search/${formKeyword}?keyName=${keyName}`
    if (formKeyword.trim()) {
      history.push(url)
    } else {
      history.push('/')
    }
  }

  return (
    <div className="px-4 py-3 border rounded-xl bg-white mb-2">
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Col sm={12} md={2}>
              <small>Buscar por:</small>
             <Form.Control onChange={(e)=>setKeyName(e.target.value)} as="select">
                <option value="name">Nombre</option>
                <option value="sku">Sku</option>
                <option value="tags">Tag</option>
              </Form.Control>
            </Col>
            <Col sm={12} md={7}>
              <small>Introduzca palabras de búsqueda:</small>
              <Form.Control type="text" onChange={(e)=>setFormKeyword(e.target.value)} placeholder="Buscar" className="mr-sm-2"></Form.Control>            
            </Col>
            <Col sm={12} md={1}>
              <Button className="mt-4" type="submit" variant="outline-primary" to={`/search/${formKeyword}`}>Buscar</Button>            
            </Col>
          </Form.Row>
        </Form>
        {
        keyword && <p className="m-0 p-0 mt-2">Mostrando productos relacionados con
         <span className="text-primary ml-2">"{keyword}"</span></p>
        }
    </div>
  )
}

export default Searchbar
