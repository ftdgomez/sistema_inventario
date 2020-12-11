import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../layouts/MainLayout'
import { listInvoices, deleteInvoice } from '../actions/invoiceActions'
import InlineLoader from '../components/InlineLoader'
import Paginate from '../components/Paginate'
import { Form, Button, Table, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const InvoicesListScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const invoiceList = useSelector(state => state.invoiceList)
  const { loading, error, invoices, page, pages } = invoiceList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [formKeyword, setFormKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (formKeyword.trim()) {

      history.replace(`/invoices/search/${formKeyword}`)
    } else {
      history.push('/')
    }
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    dispatch(deleteInvoice(id))
    history.go(0)
  }

  useEffect(() => {
    dispatch(listInvoices(keyword, pageNumber))
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [dispatch, keyword, pageNumber, userInfo])

  return (
    <MainLayout>
      {loading ?
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: 500}}><InlineLoader /></div>
      :
        <div>
          <div className="px-4 py-3 border rounded-xl bg-white mb-2">
              <Form onSubmit={submitHandler}>
                <div className="d-flex">
                  <Form.Control type="text" onChange={(e)=>setFormKeyword(e.target.value)} placeholder="Buscar en invoices" className="mr-sm-2"></Form.Control>
                  <Button type="submit" size="sm" variant="outline-primary" to={`/search/${formKeyword}`}>Buscar</Button>
                </div>
              </Form>
              {keyword && <p className="m-0 p-0 mt-2">Mostrando invoices relacionados con <span className="text-primary">"{keyword}"</span></p>}
          </div>
          {
             invoices.length > 0 ?
            <div className="pt-2 border rounded-xl main-container">
            <div className="m-4">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Enviado a:</th>
                    <th>Estado</th>
                    <th>Total Presupuestado</th>
                    <th>Controles</th>
                  </tr>
                </thead>
                <tbody>
                    {invoices.map((p, index) => (
                        <tr key={'asd'+index}>
                          <td>{index + 1}</td>
                          <td>{p.cliente.name}</td>
                          <td>{p.state}</td>
                          <td>$ {p.total}</td>
                          <td>
                          <ButtonGroup>
                            <Link to={`/invoice/edit/${p._id}`} className="btn btn-primary">Editar</Link>
                            <a className="btn btn-primary" target="_blank" href={`/invoice/${p._id}`}>Ver / Descargar</a>
                            <DropdownButton as={ButtonGroup} title="Enviar" id="bg-nested-dropdown">
                              <Dropdown.Item eventKey="1">Enviar por correo</Dropdown.Item>
                              <Dropdown.Item eventKey="2">Enviar por whatsapp</Dropdown.Item>
                            </DropdownButton>
                            <Button variant="danger" onClick={(e) => handleDelete(e, p._id)}>Eliminar</Button>
                          </ButtonGroup>
                          </td>
                        </tr>
                    ))}
              </tbody>
              </Table>
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
          <p className="p-4 bg-white border rounded-xl shadow-md">No se encontraron invoices en el sistema.</p>
          }

        </div>
    }
    </MainLayout>
  )
}

export default InvoicesListScreen
