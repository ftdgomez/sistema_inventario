import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import ProductList from '../components/ProductList'
import { Container, Row, Col, DropdownButton, Dropdown, Form, FormControl, Button } from 'react-bootstrap'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  if (loading)
  {
    return <Loader />
  }
  else
  {
    return (
      <div className="px-4" style={{maxWidth: '1366px', margin: 'auto'}}>
        <Row>
          <Col>
            <header className="mb-4">
              <Row>
                <Col md={3}>
                  <h4>Inventario Maestro</h4>
                </Col>
                <Col>
                  <div className="d-flex align-items-center">
                    <DropdownButton id="dropdown-basic-button" title="Categoria: Todas"        size="sm"
                    variant="outline-secondary">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="ml-4" id="dropdown-basic-button" title="Tienda: Todas"        size="sm"
                    variant="outline-secondary">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                    <Form inline className="ml-4">
                      <FormControl size="sm" type="text" placeholder="Buscar por palabra clave" className="mr-sm-2" />
                      <Button size="sm" variant="outline-primary">Buscar</Button>
                    </Form>
                    <Button size="sm" variant="primary" className="ml-auto">+ Agregar Producto</Button>
                  </div>
                </Col>
              </Row>
            </header>
            <ProductList products={products} />
          </Col>
          <Col md={2}>
            Datos generales.
            <p className="border p-4 bg-white">
              <span>productos en sistema.</span><br /> 
              <strong style={{fontSize: '24px'}}>1200</strong>
            </p>
            <p className="border p-4 bg-white">
              productos vendidos este mes.<br /> 
              <strong style={{fontSize: '24px'}}>100</strong>
            </p>
            <p className="border p-4 bg-white">
              productos fuera de stock.<br /> 
              <strong className="text-danger" style={{fontSize: '24px'}}>4</strong>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default HomeScreen
