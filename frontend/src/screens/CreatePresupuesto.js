import React, {useState} from 'react'
import logo from '../assets/logo.svg'
import { Col, Row, ListGroup, Form, Button} from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import { Link } from 'react-router-dom'

const CreatePresupuesto = () => {
  const [cliente, setCliente] = useState('')
  const [vendedor, setVendedor] = useState('')

  const [items, setItems] = useState([{name: '', cant: 1, price: 1 }])

  const [success, setSuccess] = useState(false)

  const handleItemChange = (e, index, key) => {
    let tempArr = []
    items.forEach((el, i) => {
      if (i !== index)
      {
        tempArr.push(el)
      }
      else
      {
        tempArr.push({...el, [key]: e.target.value})
      }
    });
    setItems(tempArr)
}


  return (
    <MainLayout>
        <div style={{height: '97vh', overflowY: 'auto'}} className="main-container bg-transparent">
          <div className="border-bottom d-flex align-items-center mb-4 p-4">
            <Link to='/' className='btn btn-light border my-3'>
              {'<'}
            </Link>
            <header className="ml-2 pt-2">
                <h4>Generar Pesupuesto</h4>
            </header>
          </div>
          <Form className="px-4" style={{maxWidth: '1024px'}}>
            <Form.Row className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
              <Col sm={12}><h4><small>Cliente y vendedor.</small></h4></Col>
              <Col md={7}>
                <Form.Control onChange={(e)=> setCliente(e.target.value)} value={cliente} placeholder="Nombre cliente" />
              </Col>
              <Col>
                <Form.Control onChange={(e)=> setVendedor(e.target.value)} value={vendedor} placeholder="Vendedor" />
              </Col>
            </Form.Row>

            <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                  <h4><small>Items</small></h4>
                  <div>
                    {
                      items.map((v, index) => (
                        <Form.Row className="mb-2" key={`ref-item-${index}`}>
                            <Col>
                              <Form.Label>Nombre producto</Form.Label>
                              <Form.Control onChange={(e)=>handleItemChange(e, index, 'name')} placeholder="Nombre producto" value={v.name} />
                            </Col>
                            <Col>
                              <Form.Label>Cantidad</Form.Label>
                              <Form.Control onChange={(e)=>handleItemChange(e, index, 'cant')} placeholder="Cantidad" value={v.cant} />
                            </Col>
                            <Col>
                              <Form.Label>Precio Unidad</Form.Label>
                              <Form.Control onChange={(e)=>handleItemChange(e, index, 'price')} placeholder="price" value={v.price} />
                            </Col>
                            <Col sm={1}>
                              {index > 0 && <Button className="mt-4" onClick={()=>setItems(items.filter((items, i) => i !== index))} variant="danger">x</Button>}
                            </Col>
                        </Form.Row>
                      ))
                    }
                    <Button onClick={()=>setItems([...items, {name: '', cant: 1, price: 1 }])} className="mt-4"><i className="im im-plus mr-2" style={{fontSize: '12px'}}></i>Agregar Item</Button>
                  </div>
            </div>
            <Button className="mb-4" type="submit" variant="primary" size="sm">Crear Presupuesto</Button>
            </Form>

        </div>
    </MainLayout>
  )
}

export default CreatePresupuesto
