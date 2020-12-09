import React from 'react'
import { Button, Table } from 'react-bootstrap'

const PresupuestoProductList = ({products, setItems, items}) => {

  const countStock = (variants) => {
    let stockFinal = 0;
    let variantsQty = 0;

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      stockFinal += variant.countInStock
      variantsQty += 1;
    }

    return (
    <small>{stockFinal} en stock para {variantsQty}{' '}{variantsQty > 1 ? 'variantes' : 'variante'}</small>
    )
  }
  
  return (
    <div style={{maxHeight: '648px'}}>
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>add</th>
                <th>sku</th>
                <th>stock</th>
              </tr>
            </thead>
            <tbody>
       {products.map(product => (
              <tr key={product._id}>
                <td>
                  <Button  onClick={()=>setItems([...items, {name: product.name, qty: 1, variants: product.variants, id: product._id },])}
                  variant="outline-primary" size="sm">+</Button>
                </td>
                <td>
                  {product.sku}
                </td>
                <td>
                  <span>{countStock(product.variants)}</span>
                </td>
              </tr>
              ))}
            </tbody>
        </Table>
    </div>
  )
}

export default PresupuestoProductList
