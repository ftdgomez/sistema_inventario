import React, {useState, useEffect} from 'react'
import { Col, Row, Form, Button, Container, Spinner, Table} from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

import { Link } from 'react-router-dom'
import PresupuestoProductList from '../components/PresupuestoProductList' 

import { createPresupuesto, listPresupuestoDetails, updatePresupuesto } from '../actions/presupuestoActions'
import { createInvoice, listInvoiceDetails, updateInvoice } from '../actions/invoiceActions'

import { toast } from 'react-toastify'; 
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const HandlePresupuesto = ({ history, match}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const {products} = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const presupuestoCreate = useSelector((state) => state.presupuestoCreate )
  // const presupuestoDetails = useSelector(state => state.presupuestoDetails)
  const presupuestoUpdate = useSelector(state => state.presupuestoUpdate)

  // const invoiceCreate = useSelector((state) => state.invoiceCreate )
  // const invoiceDetails = useSelector(state => state.invoiceDetails)
  const invoiceUpdate = useSelector(state => state.invoiceUpdate)

  function handleDataOrigin(){
    if (match.params.id)
    {
      // es edit
      if (match.params.type === 'presupuesto')
      {
        return 'presupuestoDetails'
      }
      if (match.params.type === 'invoice')
      {
        return 'invoiceDetails'
      }
    }
    else
    {
      // es create
      if (match.params.type === 'presupuesto')
      {
        return 'presupuestoCreate'
      }
      else if (match.params.type === 'invoice')
      {
        return 'invoiceCreate'
      }
    }
  }

  const dataOrigin = useSelector(state => state[handleDataOrigin()])
  const {success, error, invoice, preuspuesto} = dataOrigin

  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState([])
  const [xdate, setDate] = useState(new Date());
  
  const [productos, setProductos] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(()=> {
    if (!userInfo || !userInfo.isStore) {
      history.push('/login')
    }
    if (dataOrigin.presupuesto && JSON.stringify(dataOrigin.presupuesto) === '{}')
    {
      if (match.params.id)
      {
        dispatch(listPresupuestoDetails(match.params.id))
      }
    }
    if (dataOrigin.invoice && JSON.stringify(dataOrigin.invoice) === '{}')
    {
      if (match.params.id)
      {
        dispatch(listInvoiceDetails(match.params.id))
      }
    }
    if (dataOrigin.presupuesto && dataOrigin.success)
    {
      const {cliente, items, valido_hasta} = dataOrigin.presupuesto
      setClientName(cliente.name)
      setEmail(cliente.email)
      setPhone(cliente.phone)
      setItems(items)
      setDate(new Date(valido_hasta))
    }
    if (dataOrigin.invoice && dataOrigin.success)
    {
      const {cliente, items, pagado_at} = dataOrigin.invoice
      setClientName(cliente.name)
      setEmail(cliente.email)
      setPhone(cliente.phone)
      setItems(items)
      setDate(new Date(pagado_at))
    }
    if (presupuestoUpdate.success)
    {
      toast.success('Presupuesto actualizado con éxito!')
      dispatch({ type: 'PRESUPUESTO_UPDATE_RESET'})
    }
    if (presupuestoUpdate.error)
    {
      toast.error(presupuestoUpdate.error)
      dispatch({ type: 'PRESUPUESTO_UPDATE_RESET'})
    }
    if (invoiceUpdate.success)
    {
      toast.success('Nota de entrega actualizada con éxito!')
      dispatch({ type: 'INVOICE_UPDATE_RESET'})
    }
    if (invoiceUpdate.error)
    {
      toast.error(invoiceUpdate.error)
      dispatch({ type: 'INVOICE_UPDATE_RESET'})
    }
    if (dataOrigin.createdInvoice)
    {
      toast.success('Nota de entrega creada con éxito!')
      history.push('/list/invoices')
      dispatch({ type: 'INVOICE_CREATE_RESET' })
    }
    if (dataOrigin.createdPresupuesto)
    {
      toast.success('Presupuesto creado con éxito!')
      history.push('/list/presupuestos')
      dispatch({ type: 'PRESUPUESTO_CREATE_RESET' })
    }

  }, [dispatch, history, match, userInfo, dataOrigin.success, presupuestoUpdate.success, presupuestoUpdate.error, invoiceUpdate.success, invoiceUpdate.error,
    dataOrigin.createdInvoice,dataOrigin.createdPresupueto])

  useEffect(()=>{
    dispatch(listProducts('','', -1))
  }, [])

  const handleItemChange = (e, index, key, value) => {
    let tempArr = []
    items.forEach((el, i) => {
      if (i !== index)
      {
        tempArr.push(el)
      }
      else
      {
        tempArr.push({...el, [key]: value ? value : JSON.parse(e.target.value)})
      }
    });
    setItems(tempArr)
  }

  const handleFilter = (e) => {
    setFilterText(e.target.value.toLowerCase())
    console.log(e.target.value.toLowerCase())
    if (e.target.value.toLowerCase().length > 3)
    {
      let timer;
      clearTimeout(timer)
      timer = setTimeout(() => {
        setProductos(products.filter(p => p.sku.toLowerCase().includes(e.target.value.toLowerCase())))
      }, 400);
    }
    else
    {
      setProductos([])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const idEdit = match.params.id
    if ( clientName !== '' && email !== '' && phone !== '' && items.length > 0)
    {
      if (match.params.type === 'presupuesto')
      {
        let data = {
          cliente: {
            name: clientName,
            email: email,
            phone: phone
          },
          store: userInfo._id,
          items: items.map(el => ({qty: el.qty, product: el.product._id, variant: el.variant})),
          total: items.reduce((acc, el) => acc += (el.qty * el.variant.sellPrice), 0),
          state: 'pendiente',
          valido_hasta: xdate
        }
        if (!idEdit)
        {
          dispatch(createPresupuesto(data))
        }
        else
        {
          data._id = idEdit
          dispatch(updatePresupuesto(data))
        }
      }
      else if (match.params.type === 'invoice')
      {
        let data = {
          cliente: {
            name: clientName,
            email: email,
            phone: phone
          },
          store: userInfo._id,
          items: items.map(el => ({qty: el.qty, product: el.product._id, variant: el.variant})),
          total: items.reduce((acc, el) => acc += (el.qty * el.variant.sellPrice), 0),
          state: 'pagada',
          pagado_at: xdate
        }
        if (!idEdit)
        {
          dispatch(createInvoice(data))
        }
        else
        {
          data._id = idEdit
          dispatch(updateInvoice(data))
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
            <Link to="/dashboard" className='btn btn-light border my-3 bg-white'>
              {'<'}
            </Link>
            <header className="ml-2 pt-2">
              <h4>{match.params.id ? 'Editar ' : 'Generar '}{' '}{match.params.type === 'presupuesto' ? 'Presupuesto' : 'Nota de entrega'}</h4>
            </header>
          </div>
          <Container fluid >
          <Row>
            <Col sm={12} md={6}>
              <Form onSubmit={handleSubmit} className="px-4">
                <Form.Row className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                  <Col sm={12}><h4><small>Datos De Cliente</small></h4></Col>
                  <Col md={7}>
                    <p><small>Nombre del cliente</small></p>
                    <Form.Control onChange={(e)=> setClientName(e.target.value)} value={clientName} placeholder="Nombre cliente" />
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
                  <h4><small>{ match.params.type === 'presupuesto' ? 'Valido hasta:' : 'Pago recibido el:' }</small></h4>
                  <DatePicker selected={xdate} onChange={date => setDate(date)} />
                </div>

                <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                      <h4><small>Items ({items.length})</small></h4>
                      {items.length < 1 && <p>Utilice el filtrado de productos para empezar agregar items a este presupuesto.</p>}
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                            <th>Variante</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            items.map((item, index) => (
                              <tr key={item.product._id+index}>
                                <td>{item.product.name}</td>
                                <td>
                                  <Form.Control type="number" value={item.qty} onChange={(e)=>handleItemChange(e, index, 'qty', Number(e.target.value) )} />
                                </td>
                                <td>
                                  <Form.Control onChange={(e)=>handleItemChange(e, index, 'variant')} as="select">
                                    {item.variant && <option value={JSON.stringify(item.variant)}>{`${item.variant.ref} -> $${item.variant.sellPrice}`}</option>}
                                    {item.product.variants.map((variant)=><option value={JSON.stringify(variant)} key={variant.ref+'123'}>{`${variant.ref} -> $${variant.sellPrice}`}</option>)}
                                  </Form.Control> 
                                </td>
                                <td align="center">
                                  <Button variant="danger" onClick={()=>setItems(items.filter((i, xindex) => xindex !== index))}>x</Button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>

                      </Table>
                </div>
                <Button className="mb-4 btn-block" type="submit" variant="primary">{match.params.id ? 'Actualizar' : 'Crear'} Presupuesto</Button>
                </Form>
            </Col>
            <Col sm={12} md={6}>
              {
                productList.loading ?
                <div className="d-flex align-items-center justify-content-center flex-column bg-white border rounded-xl" style={{minHeight: '400px'}}>
                  <Spinner animation="grow" variant="primary" />
                    Cargando lista de productos...
                </div>
                :
                <div className="bg-white p-4 rounded-xl border shadow-sm">
                  <div className="mb-4">
                    <Form.Control onChange={(e)=>handleFilter(e)} value={filterText} className="border-primary" type="text" placeholder="Filtrar productos por sku" />
                    <div style={{minHeight: '14px'}}>
                      {
                        filterText &&
                          filterText.length > 3 ? <p className="text-muted"><small>Buscando {filterText}...</small></p>
                                                : <p className="text-muted">{filterText.length > 1 && <small>La búsqueda debe contener al menos 4 caracteres.</small>}</p>
                      }
                    </div>
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

export default HandlePresupuesto
