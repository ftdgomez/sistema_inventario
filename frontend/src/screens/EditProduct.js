import React, { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import MainLayout from '../layouts/MainLayout'
import { Form, Col, Button, Toast } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const EditProduct = ({ match, history }) => {

  const productId = match.params.id
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [description, setDescription] = useState('')
  const [tagsStr, setTags] = useState('')
  const [variants, setVariants] = useState([{ref: 'main', sellPrice: '', stock: ''}])

  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/')
    } 
    else
    {
      if (!product.name){
        dispatch(listProductDetails(productId))
      }
      else
      {
        setName(product.name)
        setBrand(product.brand)
        setDescription(product.description)
        setTags(product.tags.toString())
        setVariants(product.variants)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        description,
        tags: tagsStr.split(',').map(el => el.trim()),
        variants
      })
    )
  }

  if (loading)
  {
    return <Loader />
  }
  return (
      <MainLayout>
        <div style={{height: '97vh', overflowY: 'auto'}} className="main-container bg-transparent">
        <div className="border-bottom d-flex align-items-center mb-4 p-4">
          <Link to='/' className='btn btn-light border my-3'>
            {'<'}
          </Link>
          <header className="ml-2 pt-2">
              <h4>Editar Producto</h4>
          </header>
        </div>

     {/*    <Toast onClose={() => setSuccess(false)} show={success} delay={3000} autohide>
          <Toast.Body>Se ha creado un producto con éxito.</Toast.Body>
        </Toast> */}

        <Form onSubmit={submitHandler} className="px-4" style={{maxWidth: '700px'}} >

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

          <div className="p-4 border rounded-xl mb-4 bg-white shadow-sm">
            {
              variants.length < 1 ? <h4><small>Precio y Stock</small></h4> : <h4><small>Referencia variante, precio de variante y stock de variante</small></h4>
            }

              <div>
                  {
                    variants.map((v, index) => (
                      <Form.Row className="mb-2" key={`ref-item-${index}`}>
                          <Col>
                            <Form.Control placeholder="Ref" value={v.ref} />
                          </Col>
                          <Col>
                            <Form.Control placeholder="Precio" value={v.sellPrice} />
                          </Col>
                          <Col>
                            <Form.Control type="number" placeholder="stock" value={v.stock} />
                          </Col>
                          <Col sm={1}>
                            {index > 0 && <Button onClick={()=>setVariants(variants.filter((variants, i) => i !== index))} variant="danger">x</Button>}
                          </Col>
                      </Form.Row>
                    ))
                  }

                  <Button onClick={()=>setVariants([...variants, {ref: '', sellPrice: '', stock: ''}])} className="mt-4"><i className="im im-plus mr-2" style={{fontSize: '12px'}}></i>Agregar Variante</Button>
                </div>
          </div>
          <Button className="mb-4" type="submit" variant="primary" size="sm">Actualizar Producto</Button>
        </Form>
        </div>
      </MainLayout>
  )
}

export default EditProduct
