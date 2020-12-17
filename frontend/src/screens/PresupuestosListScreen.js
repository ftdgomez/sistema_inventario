import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../layouts/MainLayout'
import { listPresupuestos, deletePresupuesto } from '../actions/presupuestoActions'
import { listInvoices, deleteInvoice } from '../actions/invoiceActions'
import InlineLoader from '../components/InlineLoader'
import Paginate from '../components/Paginate'
import { Form, Button, Modal, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PRESUPUESTO_LIST_RESET } from '../constants/presupuetoConstants'
import { INVOICE_LIST_RESET } from '../constants/invoiceConstants'

const OptionsModal = ({show, setShow, link}) => {

  const handleClose = () => {
    setShow(false);
    setCodigoArea(58)
    setMsg('')
    setPhone('')
  }  

  const [codigoArea, setCodigoArea] = useState(58)
  const [msg, setMsg] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enviar Mensaje Personalizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div>
              <label>Código de área:</label>
              <input type="number" className="form-control" value={codigoArea} onChange={(e)=>setCodigoArea(e.target.value)} />
            </div>
            <div className="mb-2">
              <label>Número</label>
              <input type="text" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="4241231212" />
            </div>
            <label>Mensaje</label>
            <textarea type="text" className="form-control" value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder="Su mensaje"></textarea>
            <p className="px-4"><small>Al final de su mensaje, se anexará "<i>El link de presupuesto/nota de entrega -{'>'} http://...</i>"</small></p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Atrás
          </Button>
          <Button disabled={!(codigoArea && msg !== '' && phone !== '')} as="a" href={`https://wa.me/${codigoArea}${phone}?text=${encodeURI(msg)}${encodeURI(` || ${link}`)}`} target="_blank" variant="primary">Enviar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
  const [show, setShow] = useState(false);
  const [pid, setPid] = useState('')
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

  const handleShow = (pid) => {
    setPid(pid)
    setShow(!show)
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
              <div className="presupuesto-list-container">
                  <header>
                    <div>#Ref</div>
                    <div>cliente</div>
                    <div>Estado</div>
                    <div>Total {match.params.type === 'presupuestos' ? 'Presupuestado' : 'Vendido' }</div>
                    { userInfo && <>{userInfo.isAdmin && <div>Tienda:</div>}</>}
                    <div>Controles</div>
                  </header>
                  <section>
                      {dataOrigin[match.params.type].map((p, index) => (
                          <article key={p._id}>
                            <div>{p.refid}</div>
                            <div>{p.cliente.name}</div>
                            <div>{p.state}</div>
                            <div>$ {p.total}</div>
                            {userInfo && <>{userInfo.isAdmin && <div>{p.store.name}</div>}</>}
                            <div>
                            <ButtonGroup>
                              <Link to={`/edit/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}`} className="btn btn-primary">Editar</Link>
                              <a className="btn btn-primary" target="_blank" href={`/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`}>Ver / Descargar</a>
                              <DropdownButton as={ButtonGroup} title="Enviar" id="bg-nested-dropdown" style={{position: 'relative'}}>
                                <Dropdown.Item href={`mailto:${p.cliente.email}?subject=${encodeURI(`Su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'}`)}&body=${encodeURI(`Gracias por user nuestros servicios! puede encontrar su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'} en el siguiente link https://${window.location.hostname}/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`)}`} eventKey="1">
                                  <span className="btn btn-primary">Enviar por correo a cliente</span>
                                </Dropdown.Item>
                                <Dropdown.Item href={`https://wa.me/58${p.cliente.phone}?text=${encodeURI(`Gracias por user nuestros servicios! puede encontrar su ${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota de entrega'} en el siguiente link https://${window.location.hostname}/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${p._id}/`)}`} eventKey="2">
                                  <span className="btn btn-primary">Enviar por whatsapp a cliente</span>
                                </Dropdown.Item>
                                <Dropdown.Item as="div">
                                  <Button variant="primary" onClick={()=>handleShow(p._id)}>
                                      Enviar por whatsapp personalizado
                                  </Button>
                                </Dropdown.Item>
                   {/*              <Dropdown.Item as="div">
                                  <Button variant="primary" onClick={()=>handleCopy(p._id)}>
                                      Copiar link para compartir
                                  </Button>
                                </Dropdown.Item> */}
                              </DropdownButton>
                              <Button variant="danger" onClick={(e) => handleDelete(e, p._id)}>Eliminar</Button>
                            </ButtonGroup>
                            </div>
                          </article>
                      ))}
                  </section>
              </div>

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
      <OptionsModal show={show} setShow={setShow} 
      link={`El link de presupuesto -> https://${window.location.hostname}/pdf/${match.params.type === 'presupuestos' ? 'presupuesto' : 'invoice'}/${pid}/`}  />
    </MainLayout>
  )
}

export default PresupuestosListScreen
