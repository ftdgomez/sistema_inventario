import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Logout = ({ location, history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
      dispatch({ type: 'USER_LOGOUT' })
    }
  }, [history, userInfo, redirect])

  return (
    <div>...</div>
  )
}

export default Logout
