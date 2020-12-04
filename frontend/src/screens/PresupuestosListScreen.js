import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../layouts/MainLayout'
import { listPresupuestos } from '../actions/presupuestoActions'
import InlineLoader from '../components/InlineLoader'
import Paginate from '../components/Paginate'
import { Form, Button, Table, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'

const PresupuestosListScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const presupuestoList = useSelector(state => state.presupuestoList)
  const { loading, error, presupuestos, page, pages } = presupuestoList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [formKeyword, setFormKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (formKeyword.trim()) {
      history.push(`presupuestos/search/${formKeyword}`)
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    dispatch(listPresupuestos(keyword, pageNumber))
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
                  <Form.Control type="text" onChange={(e)=>setFormKeyword(e.target.value)} placeholder="Buscar en presupuestos" className="mr-sm-2"></Form.Control>
                  <Button type="submit" size="sm" variant="outline-primary" to={`/search/${formKeyword}`}>Buscar</Button>
                </div>
              </Form>
              {keyword && <p className="m-0 p-0 mt-2">Mostrando presupuestos relacionados con <span className="text-primary">"{keyword}"</span></p>}
          </div>
          <div className="pt-2 border rounded-xl main-container">
            <div className="m-4">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Cliente</th>
                    <th>Vendedor</th>
                    <th>N.Items</th>
                    <th>Total Presupuestado</th>
                    <th>Controles</th>
                  </tr>
                </thead>
                <tbody>
                    {presupuestos.map((p, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{p.cliente}</td>
                          <td>{p.vendedor}</td>
                          <td>{p.items.length}</td>
                          <td>${' '}{p.items.reduce((total, item)=>item.variants[0].sellPrice + total, 0)}</td>
                          <td>
                          <ButtonGroup>
                            <Button>Editar</Button>
                            <Button>Descargar</Button>
                            <DropdownButton as={ButtonGroup} title="Enviar" id="bg-nested-dropdown">
                              <Dropdown.Item eventKey="1">Enviar por correo</Dropdown.Item>
                              <Dropdown.Item eventKey="2">Enviar por whatsapp</Dropdown.Item>
                            </DropdownButton>
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
        </div>
    }
    </MainLayout>
  )
}

export default PresupuestosListScreen
