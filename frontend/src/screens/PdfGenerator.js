import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import html2pdf from 'html2pdf.js'
import { Table, Container } from 'react-bootstrap'
import logo from '../assets/logo.jpeg'
import Loader from '../components/Loader'
import '../assets/invoice.css'
import { listPresupuestoDetails } from '../actions/presupuestoActions'
import { listInvoiceDetails } from '../actions/invoiceActions'

const PdfGenerator = ({ history, match}) => {
  const objId = match.params.id
  const dispatch = useDispatch()
  const dataOrigin = useSelector(state => match.params.type === 'presupuesto' ? state.presupuestoDetails : state.invoiceDetails)
  const { loading, invoice, presupuesto, success } = dataOrigin

  useEffect(() => {
    if (dataOrigin.presupuesto)
    {
      dispatch(listPresupuestoDetails(objId))
    }
    if (dataOrigin.invoice)
    {
      dispatch(listInvoiceDetails(objId))
    }
    return function cleanup()
    {
      dispatch({ type: 'PRESUPUESTO_DETAILS_RESET' })
      dispatch({ type: 'INVIOCE_DETAILS_RESET'})
    }
  }, [dispatch, history, match])

  const generatePdf = () => {
    const element = document.querySelector('#invoice')
    html2pdf()
    .set({ html2canvas: { scale: 4 }, image: { type: 'jpeg'} })
    .from(element)
    .save(`${match.params.type === 'presupuesto' ? 'presupuesto' : 'nota-de-entrega'}-${dataOrigin[match.params.type].refid}-${dataOrigin[match.params.type].cliente.name.replace(/\s+/g, '-').toLowerCase()}`);

  }

  if (loading)
  {
    return <Loader />
  }
  return (
      <div className="bg-white">
        { (invoice || presupuesto) && success ?
        <div className="container vh-100 d-flex flex-column border" >
          <div id="invoice" className="d-flex flex-column h-100" style={{maxWidth: '95%', margin: '0 auto'}}>
          <div className="header-grid-pdf">
            <img src={logo} style={{width: '200px', height: 'auto'}} />
            <div className="text-right">
              <h4>INVERSIONES MC 2603 C.A</h4>
              <h4>RIF: J-40368117-1</h4>
              {console.log(dataOrigin)}
              <h4>DIR: {dataOrigin[match.params.type].store.address}</h4>
              <h4>TLF: {dataOrigin[match.params.type].store.contactPhone}</h4>
              <h4>EMAIL: {dataOrigin[match.params.type].store.email}</h4>
            </div>
          </div>
            <h4 className="text-center mb-4">{ match.params.type === 'presupuesto' ? 'COTIZACIÓN' : 'NOTA DE ENTREGA' }</h4>
            <div className="d-flex justify-content-between mb-4">
            <h6>Cliente: {dataOrigin[match.params.type].cliente.name}</h6>

               <h6 className="text-right">
                Válido hasta: {
                <>
                {dataOrigin[match.params.type][match.params.type === 'presupuesto' ? 'valido_hasta' : 'pagado_at'].split('T')[0].split('-')[2]}
                -
                {dataOrigin[match.params.type][match.params.type === 'presupuesto' ? 'valido_hasta' : 'pagado_at'].split('T')[0].split('-')[1]}
                -
                {dataOrigin[match.params.type][match.params.type === 'presupuesto' ? 'valido_hasta' : 'pagado_at'].split('T')[0].split('-')[0]}
                </>
              }<br /><small>dd-mm-aa</small></h6> 
            </div>
            <div>
              Ref: {dataOrigin[match.params.type].refid}
            </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th align="center">CANT.</th>
                <th align="center">DESCRIPCION</th>
                <th align="center">PRECIO UNITARIO</th>
                <th align="center">TOTAL</th>
              </tr>
            </thead>
             <tbody>
                {
                  dataOrigin[match.params.type].items.map(item => (
                    <tr key={item._id}>
                      <td align="center">{item.qty}</td>
                      <td align="center">{item.product.name} { item.variant.ref !== 'main' && <small className="muted">{'(' + item.variant.ref + ')'}</small>}</td>
                      <td align="center">$ {item.variant.sellPrice }</td>
                      <td align="right">$ {item.variant.sellPrice * item.qty}</td>
                    </tr>
                  ))
                }
              </tbody>
          </Table>
          <div className="d-flex mt-4">
            <div className="ml-auto border p-3 text-right">
              <strong>
                TOTAL: ${dataOrigin[match.params.type].total}
              </strong>
            </div>  
          </div>
          <p className="mt-auto text-center">
              {
                match.params.type === 'presupuesto'
                ?
                <small>
                  ESTA COTIZACIÓN DE NUESTROS PRODUCTOS ES VÁLIDA DESDE EL DÍA DE SU
                  EXPEDICIÓN HASTA LA FECHA ESTIPULADA EN EL CAMPO "VALIDO HASTA".
                  CUALQUIER DUDA COMUNÍQUESE CON NOSOTROS, ESTAREMOS
                  GUSTOSOS DE ATENDERLOS.
                </small>
                :
                <small>
                  CUALQUIER DUDA COMUNÍQUESE CON NOSOTROS, ESTAREMOS
                  GUSTOSOS DE ATENDERLOS.
                </small>
              }
          </p>
          </div>
        </div>
        :
          <p>No se ha encontrado{' '} {match.params.type === 'presupuesto' ? 'este presupuesto' : 'esta nota de entrega'}.</p>
            }
          <div className="container no-print">
            <button className="btn-block btn btn-primary" onClick={generatePdf}>Descargar pdf</button>
          </div>
      </div>
    )
  }

export default PdfGenerator
