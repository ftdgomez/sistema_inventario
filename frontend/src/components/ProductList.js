import React from 'react'
import { Badge, Button, Form, Accordion, Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultImg from '../assets/placeholder.jpg'
const ProductList = ({products, user}) => {

  const countStock = (variants) => {
    let stockFinal = 0;
    let variantsQty = 0;

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      stockFinal += variant.countInStock
      variantsQty += 1;
    }

    return (
    <small>{stockFinal} en stock para {variantsQty}{' '}{variantsQty > 1 ? 'variantes' : 'variante'}</small>
    )
  }
  
  return (
    <div className="product-list">
      <header className="product-list-header product-list-grid">
        <div>Img</div>
        <div>Sku</div>
        <div>Nombre</div>
        <div>Tags</div>
        <div>Stock</div>
        <div>Controles</div>
      </header>
      {products.map(product => (
        <div key={product._id}>
          <div className="product-item product-list-grid">
{/*             <img src={product.imgpaths[0].srcPath} alt="" style={{}} />
 */}
             <div style={{backgroundImage: `url(${product.imgpaths[0]})`, backgroundSize: 'cover',
          backgroundPosition: 'center', height: '50px', width: '50px'}}></div>
            <span>{product.sku}</span>
            <span><Link to={`/product/${product._id}`}>{product.name}</Link></span>
            <span>{product.tags.map((tag, index) => (<Badge key={tag+index} className="mr-2 badge-custom">{tag}</Badge>))}</span>
            <span>{countStock(product.variants)}</span>
            <Link to={`/product/${product._id}`} className="mr-2 btn btn-outline-secondary">
              {/* <i className="im im-care-down" style={{fontSize: '90%'}}></i> */}
              Editar
            </Link>
    {/*         <Accordion.Toggle as={Button} className="mr-2" size="sm" variant="outline-secondary" eventKey={product._id}>
              <i className="im im-care-down" style={{fontSize: '90%'}}></i>
            </Accordion.Toggle> */}
          </div>
          <div className="px-4 py-2">
            {product.variants.filter(i => i.countInStock < 10).map((el,i,arr )=> <p key={el._id} className="text-danger m-0"><small className="text-danger">{arr.length > 1 ? `Variante "${el.ref}"` : ''} Queda poco stock: <span className="font-weight-bold text-danger">{el.countInStock}</span></small></p>)}
          </div>
          {
            (user.isAdmin && product.store) && <p className="border"><small>Disponible en {product.store.name}</small></p>
          }
{/*           <Accordion.Collapse eventKey={product._id} className="p-4">
            <div className="product-carousel">
              <div>
                    {product.img ?
                    <Carousel>
                      {   
                        product.img.map( el=>
                        <Carousel.Item>
                          <img src={el.img ? el.img[0] : defaultImg } alt="" style={{height: 'auto', width: '100%'}} />
                        </Carousel.Item>)
                      }
                    </Carousel>
                    :
                      <Carousel>
                        <Carousel.Item>
                          <img src={product.img ? product.img[0] : defaultImg } alt="" style={{height: 'auto', width: '100%'}} />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img src={product.img ? product.img[0] : defaultImg } alt="" style={{height: 'auto', width: '100%'}} />
                        </Carousel.Item>
                          <Carousel.Item>
                          <img src={product.img ? product.img[0] : defaultImg } alt="" style={{height: 'auto', width: '100%'}} />
                        </Carousel.Item>
                      </Carousel>
                    }
                </div>
                <div className="px-4 py-2">
                    <Form>
                      <div className="product-form-header">
                        <Form.Group controlId='name'>
                          <Form.Label>Nombre</Form.Label>
                          <input autoComplete="off" type="text" class="form-control" placeholder={product.name} />
                        </Form.Group>

                        <Form.Group controlId='marca'>
                          <Form.Label>Marca</Form.Label>
                          <input autoComplete="off" type="text" class="form-control" placeholder={product.brand} />
                        </Form.Group>
                      </div>
                      <div>
                        <Form.Group controlId='description'>
                          <Form.Label>Descripción</Form.Label>
                          <Form.Control as="textarea" placeholder={product.description} rows={1} />
                        </Form.Group>
                      </div>
                      <div>
                        <p className="border-bottom">Variantes:</p>
                          {
                            product.variants.map(el => (
                              <div className="product-variant-container">
                                  <Form.Group controlId='ref'>
                                    <Form.Label>Ref</Form.Label>
                                    <input autoComplete="off" type="text" class="form-control" placeholder={el.ref} />
                                  </Form.Group>
        
                                  <Form.Group controlId='unityPrice'>
                                    <Form.Label>Precio Unidad</Form.Label>
                                    <input autoComplete="off" type="text" class="form-control" placeholder={el.unityPrice} />
                                  </Form.Group>
        
                                  <Form.Group controlId='sellPrice'>
                                    <Form.Label>Precio Venta</Form.Label>
                                    <input autoComplete="off" type="text" class="form-control" placeholder={el.sellPrice} />
                                  </Form.Group>
                              </div>
                              ))
                          }
                      </div>
                    </Form>
                </div>
            </div>
          </Accordion.Collapse> */}
        </div>
      ))}
    </div>
  )
}

export default ProductList
