import React, {useState, useEffect} from 'react'
import { Col, Row, Form, Button, Container, Toast} from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, resetListProducts } from '../actions/productActions'
import PresupuestoProductList from '../components/PresupuestoProductList'
import { createPresupuesto } from '../actions/presupuestoActions'
import { Link } from 'react-router-dom'

const CrearNotaDeEntrega = ({ history, match}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products  } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const presupuestoCreate = useSelector((state) => state.presupuestoCreate )

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const [cliente, setCliente] = useState('')
  const [vendedor, setVendedor] = useState('')
  const [items, setItems] = useState([])
  const [productos, setProductos] = useState([])

  const [success, setSuccess] = useState(false)

  const handleItemChange = (e, index, key, value) => {
    let tempArr = []
    items.forEach((el, i) => {
      if (i !== index)
      {
        tempArr.push(el)
      }
      else
      {
        tempArr.push({...el, [key]: value ? value : e.target.value})
      }
    });
    setItems(tempArr)
  }
  
  const handleBack = () => {
    dispatch(resetListProducts())
    history.push('/')
  }

  useEffect(() => {
    if (products.length <= 20)
    {
      dispatch(listProducts(keyword, pageNumber, -1))
    }    
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (presupuestoCreate.success && productos.length > 0)
    {
      setCliente('')
      setVendedor('')
      setItems([])
      setProductos([])
      setSuccess(true)
    }
    
  }, [dispatch, keyword, pageNumber, userInfo, productos, presupuestoCreate.success])



  const handleFilter = (e) => {
    setProductos(products.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleCreatePresupuesto = (e) => {
    e.preventDefault()
    let products = items.map(item => item.id)
    const data = {
      cliente, vendedor, items, products
    }
    dispatch(createPresupuesto(data))

  }

  return (
    <MainLayout>
        <div style={{height: '97vh', overflowY: 'auto'}} className="main-container bg-transparent">
          <div className="border-bottom d-flex align-items-center mb-4 p-4">
            <button onClick={()=> handleBack()} className='btn btn-light border my-3'>
              {'<'}
            </button>
            <header className="ml-2 pt-2">
                <h4>Generar Nota De Entrega</h4>
            </header>
          </div>
          <Toast className="border border-primary" onClose={() => setSuccess(false)} show={success} delay={3000} autohide>
            <Toast.Body>Se ha creado un presupuesto con éxito.
            <br />
            <Link to="/notas-de-entrega"><span className="text-primary">Ir al listado de Notas De Entrega.</span></Link></Toast.Body>
          </Toast>
          <Container fluid >
          <Row>
            <Col>
              <Form onSubmit={handleCreatePresupuesto} className="px-4">
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
                      {items.length < 1 && <p>Utilice el filtrado de productos para empezar agregar items a esta Nota De Entrega.</p>}
                      <div>
                        {
                          items.map((v, index) => (
                            <Form.Row className="mb-2" key={`ref-item-${index}`}>
                                <Col sm={4}>
                                  <Form.Label>Nombre producto</Form.Label>
                                  <p><small>{v.name}</small></p>
                                </Col>
                                <Col sm={2}>
                                  <Form.Label>Cantidad</Form.Label>
                                  <Form.Control onChange={(e)=>handleItemChange(e, index, 'cant')} placeholder="Cantidad" value={v.cant} />
                                </Col>
                                {
                                  v.variants.length > 1 ?
                                  <Col>
                                        <Form.Label>Precio Unidad</Form.Label>
                                        <Form.Control onChange={(e)=>handleItemChange(e, index, 'variants', [{ref: e.target.value.split('->')[0].trim(), sellPrice: Number(e.target.value.split('->')[1].trim().substring(1))}])} as="select">
                                          {v.variants.map((variant)=><option key={variant.ref+'123'}>{`${variant.ref} -> $${variant.sellPrice}`}</option>)}
                                        </Form.Control>
                                  </Col>
                                  :
                                  <Col>
                                    <Form.Label>Precio Unidad</Form.Label>
                                    <p className="form-control">Precio único: ${v.variants[0].sellPrice}</p>
                                  </Col>

                                }
                                <Col sm={1}>
                                   <Button style={{marginTop: '2em'}} onClick={()=>setItems(items.filter((items, i) => i !== index))} variant="danger">x</Button>
                                </Col>
                            </Form.Row>
                          ))
                        }
                      </div>
                </div>
                <Button className="mb-4" type="submit" variant="primary">Crear Nota De Entrega</Button>
                </Form>
            </Col>
            <Col sm={12} md={6}>
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <div className="mb-4">
                    <Form.Control onChange={(e)=>handleFilter(e)} className="border-primary" type="text" placeholder="Filtrar productos" />
                  </div>
                  { productos && <PresupuestoProductList products={productos} items={items} setItems={setItems} /> }
                </div>
            </Col>
          </Row>
          </Container>
        </div>
    </MainLayout>
  )
}

export default CrearNotaDeEntrega
