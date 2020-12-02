import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { createProduct } from '../actions/productActions'
import MainLayout from '../layouts/MainLayout'
import { Form, Col, Button, Toast } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductHandler = () => {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [tagsStr, setTags] = useState('')

  const [isVariant, setForVariant] = useState(false)
  const [variants, setVariants] = useState([{ref: 'main', sellPrice: '', stock: ''}])

  const [success, setSuccess] = useState(false)

  const handleVariantChange = (e, index, key) => {
      let tempArr = []
      variants.forEach((el, i) => {
        if (i !== index)
        {
          tempArr.push(el)
        }
        else
        {
          tempArr.push({...el, [key]: e.target.value})
        }
      });
      setVariants(tempArr)
  }

  const dispatch = useDispatch()
  const productCreate = useSelector((state) => state.productCreate )

  const submitHandler = (e) => {
    e.preventDefault()
    let tags = tagsStr.split(',').map(el => el.trim())
    dispatch(createProduct({
      name,
      brand,
      description,
      tags,
      variants
    }))
    if (productCreate.success)
    {
      setName('')
      setBrand('')
      setDescription('')
      setTags('')
      setForVariant(false)
      setVariants([{ref: 'main', sellPrice: '', stock: ''}])
      setSuccess(true)
    }
    else
    {
      alert('Ha ocurrido un error, revise la data.')
    }
  }

  return (
      <MainLayout>
        <div style={{height: '97vh', overflowY: 'auto'}} className="main-container bg-transparent">
        <div className="border-bottom d-flex align-items-center mb-4 p-4">
          <Link to='/' className='btn btn-light border my-3'>
            {'<'}
          </Link>
          <header className="ml-2 pt-2">
              <h4>Crear Producto Nuevo</h4>
          </header>
        </div>

        <Toast onClose={() => setSuccess(false)} show={success} delay={3000} autohide>
          <Toast.Body>Se ha creado un producto con éxito.</Toast.Body>
        </Toast>

        <Form className="px-4" style={{maxWidth: '700px'}} onSubmit={submitHandler}>

          <Form.Row className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
            <Col sm={12}><h4><small>Título, marca y descripción.</small></h4></Col>
            <Col md={7}>
              <Form.Control onChange={(e)=> setName(e.target.value)} value={name} placeholder="Nombre de producto" />
            </Col>
            <Col>
              <Form.Control onChange={(e)=> setBrand(e.target.value)} value={brand} placeholder="Marca" />
            </Col>
            <Col sm={12}>
              <Form.Control onChange={(e)=> setDescription(e.target.value)} value={description}  as="textarea" placeholder="Descripción de producto" className="mt-2" />
              <Form.Text className="text-muted">
                Solo se utiliza para la descripción en la tienda online.
              </Form.Text>
            </Col>
          </Form.Row>

          <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
            <h4><small>Tags</small></h4>
            <p>Escriba los tags separados por comas (,)</p>
            <Form.Control onChange={(e)=> setTags(e.target.value)} value={tagsStr} placeholder="tag1, tag2, tag3, tag4" />
            <Form.Text className="text-muted">
              Los tags funcionan como palabras claves en el buscador. En la tienda web, también se utilizarán para palablas claves en buscadores (SEO)
            </Form.Text>
          </div>

          <Form.Row className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
            <Col sm={12} className="mt-2">
              <Form.Group controlId="variantHandler" onChange={()=>setForVariant(!isVariant)}>
                <Form.Check style={{color: '#646464'}} type="checkbox" label="Este producto tiene diferentes opciones, como distintos tamaños o colores." />
              </Form.Group>
            </Col>
          </Form.Row>
          <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
            {
              !isVariant ? <h4><small>Precio y Stock</small></h4> : <h4><small>Referencia variante, precio de variante y stock de variante</small></h4>
            }

            {
              isVariant
              ?
                <div>
                  {
                    variants.map((v, index) => (
                      <Form.Row className="mb-2" key={`ref-item-${index}`}>
                          <Col>
                            <Form.Control onChange={(e)=>handleVariantChange(e, index, 'ref')} placeholder="Ref" value={v.ref} />
                          </Col>
                          <Col>
                            <Form.Control onChange={(e)=>handleVariantChange(e, index, 'sellPrice')} placeholder="Precio" value={v.sellPrice} />
                          </Col>
                          <Col>
                            <Form.Control onChange={(e)=>handleVariantChange(e, index, 'stock')} type="number" placeholder="stock" value={v.stock} />
                          </Col>
                          <Col sm={1}>
                            {index > 0 && <Button onClick={()=>setVariants(variants.filter((variants, i) => i !== index))} variant="danger">x</Button>}
                          </Col>
                      </Form.Row>
                    ))
                  }

                  <Button onClick={()=>setVariants([...variants, {ref: '', sellPrice: '', stock: ''}])} className="mt-4"><i className="im im-plus mr-2" style={{fontSize: '12px'}}></i>Agregar Variante</Button>
                </div>
              :
                <Form.Row>
                  <Col md={7}>
                    <Form.Control onChange={(e)=>setVariants([{...variants[0], sellPrice: e.target.value}])} value={variants[0].sellPrice} placeholder="Precio" />
                  </Col>
                  <Col>
                    <Form.Control onChange={(e)=>setVariants([{...variants[0], stock: e.target.value}])} value={variants[0].stock} type="number" placeholder="999" />
                  </Col>
                </Form.Row>
            }
          </div>
          <Button className="mb-4" type="submit" variant="primary" size="sm">Crear Producto</Button>
        </Form>
        </div>
      </MainLayout>
  )
}

export default ProductHandler
