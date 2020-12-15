import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../layouts/MainLayout'
import { listPresupuestos, deletePresupuesto } from '../actions/presupuestoActions'
import { listInvoices, deleteInvoice } from '../actions/invoiceActions'
import InlineLoader from '../components/InlineLoader'
import Paginate from '../components/Paginate'
import { Form, Button, Table, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PRESUPUESTO_LIST_RESET } from '../constants/presupuetoConstants'
import { INVOICE_LIST_RESET } from '../constants/invoiceConstants'

const PresupuestosListScreen = ({ history, match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [formKeyword, setFormKeyword] = useState('')
  const dataOrigin = useSelector(state => match.params.type === 'presupuestos' ? state.presupuestoList : state.invoiceList)
  const { loading, error, success, page, pages, invoices, presupuestos } = dataOrigin

  const dataDeleted = useSelector(state => match.params.type === 'presupuestos' ? state.presupuestoDelete : state.invoiceDelet)

  useEffect(() => {
    if (!userInfo || !userInfo.isStore) {
      history.push('/login')
    }
    if (dataOrigin.invoices)
    {
      dispatch(listInvoices(keyword, pageNumber))
    }
    if (dataOrigin.presupuestos)
    {
      dispatch(listPresupuestos(keyword, pageNumber))
    }
    if (dataDeleted.success)
    {
      history.go(0)
    }
    return function cleanup()
    {
      dispatch({type: PRESUPUESTO_LIST_RESET})
      dispatch({type: INVOICE_LIST_RESET})
    }
  }, [dispatch, history, keyword, pageNumber, userInfo, match, dataDeleted.success])


  const submitHandler = (e) => {
    e.preventDefault()
    if (formKeyword.trim()) {
      history.replace(`/list/${match.params.type}/search/${formKeyword}`)
    } else {
      history.push('/')
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    if (match.params.type === 'presupuestos')
    {
      dispatch(deletePresupuesto(id))
    }
    else
    {
      dispatch(deleteInvoice(id))
    }
  }


  return (
    <MainLayout>
      {loading ?
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: 500}}><InlineLoader /></div>
      :
        <div>
          <div className="px-4 py-3 border rounded-xl bg-white mb-2">
              <Form onSubmit={submitHandler}>
                <div className="d-flex">
                  <Form.Control type="text" onChange={(e)=>setFormKeyword(e.target.value)} placeholder="Buscar en presupuestos" className="mr-sm-2"></Form.Control>
                  <Button type="submit" size="sm" variant="outline-primary" to={`/search/${formKeyword}`}>Buscar</Button>
                </div>
              </Form>
              {keyword && <p className="m-0 p-0 mt-2">Mostrando presupuestos relacionados con <span className="text-primary">"{keyword}"</span></p>}
          </div>
          {
            (presupuestos || invoices) ?
            <div className="pt-2 border rounded-xl main-container">
            <div className="m-4">
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>#Ref</th>
                    <th>cliente</th>
                    <th>Estado</th>
                    <th>Total {match.params.type === 'presupuestos' ? 'Presupuestado' : 'Vendido' }</th>
                    { userInfo && <>{userInfo.isAdmin && <th>Tienda:</th>}</>}
                    <th>Controles</th>
                  </tr>
                </thead>
                <tbody>
                    {dataOrigin[match.params.type].map((p, index) => (
                        <tr key={p._id}>
                          <td>{p.refid}</td>
                          <td>{p.cliente.name}</td>
                          <td>{p.state}</td>
                          <td>$ {p.total}</td>
                          {userInfo && <>{userInfo.isAdmin && <td>{p.store.name}</td>}</>}
                          <td>
                          <ButtonGroup>
                            <Link to={`/edit/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}`} className="btn btn-primary">Editar</Link>
                            <a className="btn btn-primary" target="_blank" href={`/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`}>Ver / Descargar</a>
                            <DropdownButton as={ButtonGroup} title="Enviar" id="bg-nested-dropdown">
                              <Dropdown.Item href={`mailto:${p.cliente.email}?subject=${encodeURI(`Su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'}`)}&body=${encodeURI(`Gracias por user nuestros servicios! puede encontrar su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'} en el siguiente link https://${window.location.hostname}/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`)}`} eventKey="1">
                                Enviar por correo
                              </Dropdown.Item>
                              <Dropdown.Item href={`https://wa.me/58${p.cliente.phone}?text=${encodeURI(`Gracias por user nuestros servicios! puede encontrar su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'} en el siguiente link https://${window.location.hostname}/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`)}`} eventKey="2">
                                Enviar por whatsapp
                              </Dropdown.Item>
                            </DropdownButton>
                            <Button variant="danger" onClick={(e) => handleDelete(e, p._id)}>Eliminar</Button>
                          </ButtonGroup>
                          </td>
                        </tr>
                    ))}
              </tbody>
              </Table>
              {dataOrigin[match.params.type].length < 1 && <p>Parace que no se han creado {match.params.type} en esta tienda.</p>}
            </div>
            <div className="paginate-container">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </div>
          :
          <p className="p-4 bg-white border rounded-xl shadow-md">
            No se encontraron  {' '}
            {match.params.type === 'presupuestos'
              ? 'presupuestos'
              : 'notas de entrega'
            }
            {' '}en el sistema.
            
          </p>
          }

        </div>
    }
    </MainLayout>
  )
}

export default PresupuestosListScreen
