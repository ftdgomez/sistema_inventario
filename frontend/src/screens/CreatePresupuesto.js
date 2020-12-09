import React, {useState, useEffect} from 'react'
import { Col, Row, Form, Button, Container, Spinner} from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, resetListProducts } from '../actions/productActions'
import PresupuestoProductList from '../components/PresupuestoProductList'
import { createPresupuesto, listPresupuestoDetails } from '../actions/presupuestoActions'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const CreatePresupuesto = ({ history, match}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products  } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const presupuestoCreate = useSelector((state) => state.presupuestoCreate )

  const presupuestoDetails = useSelector(state => state.presupuestoDetails)
  const {presupuesto} = presupuestoDetails

  const idEdit = match.params.id

  const [cliente, setCliente] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState([])
  const [xdate, setDate] = useState(new Date());

  const [productos, setProductos] = useState([])


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
      dispatch(listProducts('','', -1))
    }    
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (presupuestoCreate.success && productos.length > 0)
    {
      setCliente('')
      setEmail('')
      setPhone('')
      setItems([])
    }
    if (idEdit && !presupuesto)
    {
      dispatch(listPresupuestoDetails(idEdit))
    }
    if (presupuestoDetails.success)
    {
      setCliente(presupuesto.cliente.name)
      setEmail(presupuesto.cliente.email)
      setPhone(presupuesto.cliente.phone)
      console.log(presupuesto.items)
      /* setItems(presupuesto.items) */
      setDate(new Date(presupuesto.valido_hasta))
    }
  }, [dispatch, userInfo, productos, presupuestoCreate.success, presupuestoDetails.success, presupuesto])



  const handleFilter = (e) => {
    setProductos(products.filter(p => p.sku.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleCreatePresupuesto = (e) => {
    e.preventDefault()
    if (
      cliente !== ''
      && email !== ''
      && phone !== ''
      && items.length > 0
      )
    {
      const itms = items.map((el) => ({
        qty: el.qty,
        product: el.id,
        variantRef: el.variants[0].ref,
        totalPrice: el.qty * el.variants[0].sellPrice
      }))

      const data = {
        cliente:{
          name: cliente,
          email: email,
          phone: phone
        },
        store: userInfo._id,
        items: itms,
        state: 'pendiente',
        valido_hasta: xdate,
        total: itms.reduce( (total, num ) => total + num.totalPrice, 0)
      }
      if (idEdit)
      {
        alert('Yes!')
      }
      else
      {
        dispatch(createPresupuesto(data))
        if (presupuestoCreate.error)
        {
          toast.error(`Parece que ha ocurrido un error: ${presupuestoCreate.error}`)
        }
        else if (presupuestoCreate.success)
        {
          toast.success('Bien! presupuesto creado con éxito.')
        }
      }
    }
    else
    {
      toast.error("Vaya! parace que no has rellenado todos los datos necesarios. Verifica e inténtalo de nuevo.");
    }


  }

  return (
    <MainLayout>
        <div style={{height: '97vh', overflowY: 'auto'}} className="main-container bg-transparent">
          <div className="border-bottom d-flex align-items-center mb-4 p-4">
            <button onClick={()=> handleBack()} className='btn btn-light border my-3'>
              {'<'}
            </button>
            <header className="ml-2 pt-2">
            <h4>{idEdit ? 'Editar ' : 'Generar '} Presupuesto</h4>
            </header>
          </div>
          <Container fluid >
          <Row>
            <Col>
              <Form onSubmit={handleCreatePresupuesto} className="px-4">
                <Form.Row className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                  <Col sm={12}><h4><small>Datos De Cliente</small></h4></Col>
                  <Col md={7}>
                    <p><small>Nombre del cliente</small></p>
                    <Form.Control onChange={(e)=> setCliente(e.target.value)} value={cliente} placeholder="Nombre cliente" />
                  </Col>
                  <Col>
                    <p><small>Teléfono</small></p>
                    <Form.Control onChange={(e)=> setPhone(e.target.value)} value={phone} placeholder="4244564545" />
                  </Col>
                  <Col sm={12} className="mt-2">
                    <p><small>Email</small></p>
                    <Form.Control onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Email" />
                  </Col>
                </Form.Row>

                <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                  <h4><small>Valido hasta:</small></h4>
                  <DatePicker selected={xdate} onChange={date => setDate(date)} />
                </div>

                <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                      <h4><small>Items</small></h4>
                      {items.length < 1 && <p>Utilice el filtrado de productos para empezar agregar items a este presupuesto.</p>}
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
                                  <Form.Control onChange={(e)=>handleItemChange(e, index, 'qty')} placeholder="Cantidad" value={v.qty} />
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
                <Button className="mb-4 btn-block" type="submit" variant="primary">{idEdit ? 'Actualizar' : 'Crear'} Presupuesto</Button>
                </Form>
            </Col>
            <Col sm={12} md={6}>
              {
                productList.loading ?
                <div><Spinner animation="grow" variant="primary" />Cargando lista de productos...</div>
                :
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <div className="mb-4">
                    <Form.Control onChange={(e)=>handleFilter(e)} className="border-primary" type="text" placeholder="Filtrar productos por sku" />
                  </div>
                  { productos && <PresupuestoProductList products={productos} items={items} setItems={setItems} /> }
                </div>
              }
            </Col>
          </Row>
          </Container>
        </div>
    </MainLayout>
  )
}

export default CreatePresupuesto
