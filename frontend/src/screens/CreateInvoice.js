import React, {useState, useEffect} from 'react'
import { Col, Row, Form, Button, Container, Spinner, Table} from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, resetListProducts } from '../actions/productActions'
import InvoiceProductList from '../components/InvoiceProductList'
import { createInvoice, listInvoiceDetails, updateInvoice } from '../actions/invoiceActions'
import { Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const CreateInvoice = ({ history, match}) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const {products} = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const invoiceCreate = useSelector((state) => state.invoiceCreate )

  const invoiceDetails = useSelector(state => state.invoiceDetails)

  const invoiceUpdate = useSelector(state => state.invoiceUpdate)

  const idEdit = match.params.id

  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState([])
  const [xdate, setDate] = useState(new Date());

  const [productos, setProductos] = useState([])
  const [filterText, setFilterText] = useState('')

  const cleanInterface = () => {
    setClientName('')
    setEmail('')
    setItems([])
    setDate(new Date())
    setProductos([])
    setFilterText('')
    dispatch({ type: 'INVOICE_DETAILS_RESET' })
  }

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

  useEffect(()=> {
    console.log(items)  
  }, [items, dispatch])

  /* handle the user info */
  useEffect(() => {  
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [userInfo])

  /* Populate listProduct on Mount */
  useEffect(()=> {
    dispatch(listProducts('','', -1))
    if (idEdit)
    {
      dispatch(listInvoiceDetails(idEdit))
    }
  }, [])

  useEffect(()=> {

    if (invoiceDetails.success)
    {
      const {cliente, items, valido_hasta} = invoiceDetails.invoices
      setClientName(cliente.name)
      setEmail(cliente.email)
      setPhone(cliente.phone)
      setItems(items)
      setDate(new Date(valido_hasta))
    }
  }, [invoiceDetails, dispatch])

  /* clean details and list product on unmount*/
  useEffect(()=> {
    return function cleanup(){
      console.log('unmount')
      dispatch({type: 'INVOICE_DETAILS_RESET'})
      dispatch(resetListProducts())
    }
  }, [])

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
    if ( clientName !== '' && email !== '' && phone !== '' && items.length > 0)
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
        pagado_at: xdate
      }
      if (!idEdit)
      {
        dispatch(createInvoice(data))
        if (invoiceCreate.success)
        {
          toast.success('Invoice creado con éxito!')
        }
      }
      else
      {
        data._id = idEdit
        dispatch(updateInvoice(data))
        if (invoiceUpdate.success)
        {
          toast.success('Invoice actualizado con éxito!')
          history.push('/invoices')
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
            <Link to="/invoices" className='btn btn-light border my-3 bg-white'>
              {'<'}
            </Link>
            <header className="ml-2 pt-2">
            <h4>{idEdit ? 'Editar ' : 'Generar '} Invoice</h4>
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
                  <h4><small>Valido hasta:</small></h4>
                  <DatePicker selected={xdate} onChange={date => setDate(date)} />
                </div>

                <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
                      <h4><small>Items ({items.length})</small></h4>
                      {items.length < 1 && <p>Utilice el filtrado de productos para empezar agregar items a este invoice.</p>}
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
                <Button className="mb-4 btn-block" type="submit" variant="primary">{idEdit ? 'Actualizar' : 'Crear'} Invoice</Button>
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
                  { productos && <InvoiceProductList products={productos} items={items} setItems={setItems} /> }
                </div>
              }
            </Col>
          </Row>
          </Container>
        </div>
    </MainLayout>
  )
}

export default CreateInvoice
