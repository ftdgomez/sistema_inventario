import React from 'react'
import { Badge, Button, Form } from 'react-bootstrap'

const ProductList = ({products}) => {
  return (
    <div className="product-list">
      <header className="product-list-header product-list-grid">
        <div>#</div>
        <div>sku</div>
        <div>Nombre</div>
        <div>Tags</div>
        <div>Precio De Venta</div>
        <div>Stock</div>
        <div>Controles</div>
      </header>
      {products.map(product => (
        <div key={product._id} className="product-item product-list-grid">
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" />
            </Form.Group>
          </Form>
          <span>{product._id.slice(-4).toString().replace(/,/g, '')}</span>
          <span><a href="#">{product.name}</a></span>
          <span>{product.tags.map(tag => (<Badge className="mr-2 badge-custom">{tag}</Badge>))}</span>
          <span>$ 99</span>
          <span>100</span>
          <Button size='sm' className="mr-2" variant="outline-secondary">Editar</Button>
          <Button size='sm' variant="danger">Borrar</Button>
        </div>
      ))}
    </div>
  )
}

export default ProductList
