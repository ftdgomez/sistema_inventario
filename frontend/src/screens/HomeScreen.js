import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'
import ProductList from '../components/ProductList'

import { listProducts } from '../actions/productActions'

import { Form, FormControl, Button } from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const [searchWord, setSearchWord] = useState('')

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  if (loading)
  {
    return <Loader />
  }
  else
  {
    return (
        <MainLayout>
          <div className="px-4 py-3 border rounded-xl bg-white mb-2">
              <div className="d-flex">
                <input onChange={(e)=>setSearchWord(e.target.value)} type="text" placeholder="Search" className="mr-sm-2 form-control" />
                <Link className="btn btn-outline-primary" to={`/search/${searchWord}`}>Search</Link>
              </div>
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
