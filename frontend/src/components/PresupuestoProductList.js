import React from 'react'
import { Badge, Button, Form, Accordion, Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultImg from '../assets/placeholder.jpg'
const PresupuestoProductList = ({products, setItems, items}) => {

  const countStock = (variants) => {
    let stockFinal = 0;
    let variantsQty = 0;

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      stockFinal += variant.inStore.reduce( (acc, el) => acc + el.countInStock, 0 )
      variantsQty += 1;
    }

    return (
    <small>{stockFinal} en stock para {variantsQty}{' '}{variantsQty > 1 ? 'variantes' : 'variante'}</small>
    )
  }
  
  return (
    <div style={{maxHeight: '648px'}} className="product-list-presupuesto">
      <header className="product-list-header product-list-grid">
        <div>#</div>
        <div>sku</div>
        <div>Nombre</div>
        <div>Stock</div>
      </header>
      {products.map(product => (
          <div key={product._id} className="product-item product-list-grid">
            <Button  onClick={()=>setItems([...items, {name: product.name, cant: 1, variants: product.variants, id: product._id },])}
            variant="outline-primary" size="sm">Agregar a presupuesto</Button>
            <span>{product._id.slice(-4).toString().replace(/,/g, '')}</span>
            <span><Link to={`/product/${product._id}`}>{product.name}</Link></span>
            <span>{countStock(product.variants)}</span>
          </div>
      ))}
    </div>
  )
}

export default PresupuestoProductList
