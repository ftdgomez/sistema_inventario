import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import ProductList from '../components/ProductList'

import { listProducts } from '../actions/productActions'

import MainLayout from '../layouts/MainLayout'
import Paginate from '../components/Paginate'

import { Button, Form } from 'react-bootstrap'

const HomeScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [formKeyword, setFormKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (formKeyword.trim()) {
      history.push(`/search/${formKeyword}`)
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [dispatch, keyword, pageNumber, userInfo])


  if (loading)
  {
    return <Loader />
  }
  else
  {
    return (
        <MainLayout>
          <div className="px-4 py-3 border rounded-xl bg-white mb-2">
              <Form onSubmit={submitHandler}>
                <div className="d-flex">
                  <Form.Control type="text" onChange={(e)=>setFormKeyword(e.target.value)} placeholder="Search" className="mr-sm-2"></Form.Control>
                  <Button type="submit" size="sm" variant="outline-primary" to={`/search/${formKeyword}`}>Buscar</Button>
                </div>
              </Form>
              {keyword && <p className="m-0 p-0 mt-2">Mostrando productos relacionados con <span className="text-primary">"{keyword}"</span></p>}
          </div>
          <div className="pt-2 border rounded-xl main-container">
            <ProductList products={products}/>
            <div className="paginate-container">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          </div>
        </MainLayout>
    )
  }
}

export default HomeScreen
