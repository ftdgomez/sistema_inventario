import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listPresupuestoDetails } from '../actions/presupuestoActions'
import html2pdf from 'html2pdf.js'
import { Table, Container } from 'react-bootstrap'
import logo from '../assets/logo.jpeg'
import Loader from '../components/Loader'
import '../assets/invoice.css'

const PdfGenerator = ({ match}) => {
  const presupuestoId = match.params.id
  const [showControls, setShowControls] = useState(true)
  const dispatch = useDispatch()
  const presupuestoDetails = useSelector(state => state.presupuestoDetails)
  const {loading, error, success, presupuesto} = presupuestoDetails

  useEffect(() => {
    dispatch(listPresupuestoDetails(presupuestoId))
  }, [dispatch  ])

  const generatePdf = () => {
    const element = document.querySelector('#invoice')
/*     setShowControls(!showControls)
 */    html2pdf()
    .set({ html2canvas: { scale: 4 }, image: { type: 'jpeg'} })
    .from(element)
    .save(`presupuesto-${presupuesto.cliente.name.toLowerCase().replace(/' '/g, '-')}`);

  }

  if (loading)
  {
    return <Loader />
  }
  if (presupuesto)
  {
    return (
      <div className="bg-white">
        
        <div className="container vh-100 d-flex flex-column border" >
          <div id="invoice" className="d-flex flex-column h-100" style={{maxWidth: '95%', margin: '0 auto'}}>
          <div className="header-grid-pdf">
            <img src={logo} style={{width: '200px', height: 'auto'}} />
            <div className="text-right">
              <h4>INVERSIONES MC 2603 C.A</h4>
              <h4>RIF: J-40368117-1</h4>
              <h4>{presupuesto.store.address}</h4>
              <h4>TLF: {presupuesto.store.contactPhone}</h4>
              <h4>EMAIL: {presupuesto.store.email}</h4>
            </div>
          </div>
            <h4 className="text-center mb-4">COTIZACIÓN</h4>
            <div className="d-flex justify-content-between mb-4">
              <h6>Cliente: {presupuesto.cliente.name}</h6>
              <h6>Válido hasta: {
                <>
                {presupuesto.valido_hasta.split('T')[0].split('-')[2]}
                -
                {presupuesto.valido_hasta.split('T')[0].split('-')[1]}
                -
                {presupuesto.valido_hasta.split('T')[0].split('-')[0]}
                </>
              }</h6>
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
                presupuesto.items.map(item => (
                  <tr key={item._id}>
                    <td align="center">{item.qty}</td>
                    <td align="center">{item.product.name}</td>
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
                TOTAL: ${presupuesto.total}
              </strong>
            </div>  
          </div>
          <p className="mt-auto text-center">
            <small>
              ESTA COTIZACIÓN DE NUESTROS PRODUCTOS ES VÁLIDA DESDE EL DÍA DE SU
              EXPEDICIÓN HASTA LA FECHA ESTIPULADA EN EL CAMPO "VALIDO HASTA".
              CUALQUIER DUDA COMUNÍQUESE CON NOSOTROS, ESTAREMOS
              GUSTOSOS DE ATENDERLOS.
            </small>
          </p>
          </div>
        </div>
        {
          showControls &&
          <div className="container">
            <button className="btn-block btn btn-primary" onClick={generatePdf}>Descargar pdf</button>
          </div>
        }
      </div>
    )
  }
  return <p>No se ha encontrado este presupuesto.</p>
}

export default PdfGenerator
