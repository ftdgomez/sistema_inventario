import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../layouts/MainLayout'
import Loader from '../components/Loader'
import ProductList from '../components/ProductList'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import Searchbar from '../components/Searchbar'

const HomeScreen = ({ history, match }) => {

  const keyWord = match.params.keyword
  const pageNumber = match.params.pageNumber
  const [queriesParams, setParams] = useState({})

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo || !userInfo.isStore) {
      history.push('/login')
    }
    const queries = new URLSearchParams(window.location.search)
    let finalobj = {}
    if (queries)
    {
      for (let pair of queries)
      {
        let obj = {[pair[0]]: pair[1]}
        finalobj = {...finalobj, ...obj}
      }
    }
    dispatch(listProducts(keyWord, pageNumber, finalobj.pageSize, finalobj.keyName))
    setParams(finalobj)
  }, [dispatch, keyWord, pageNumber, userInfo])


  if (loading)
  {
    return <Loader />
  }
  else
  {
    return (
        <MainLayout>
          <Searchbar history={history} keyword={keyWord} params={queriesParams} />
          <div className="pt-2 border rounded-xl main-container">
            {products ? <ProductList products={products} user={userInfo} /> : <p>No hay productos para mostrar aquí.</p>}
            <div className="paginate-container">
              <Paginate
                pages={pages}
                page={page}
                keyword={keyWord}
                keyName={queriesParams.keyName}
              />
            </div>
          </div>
        </MainLayout>
    )
  }
}

export default HomeScreen
