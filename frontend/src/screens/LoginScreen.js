import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import logo from '../assets/icon.png'
import { toast } from 'react-toastify'

const Message = ({variant, children}) => {
  return <Alert variant={variant}>{children}</Alert>
}

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (error === 'Request failed with status code 401')
    {
      toast.error('El usuario no existe o no está autorizado.')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <img src={logo} alt="logo" style={{height: '32px', width: '32px'}} />
      <h4>Iniciar Sesión</h4>
      {error && <Message variant='danger'>{error === 'Request failed with status code 401' ? 'El usuario no existe o no está autorizado.' : error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Dirección de Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Su email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Su contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Iniciar sesión
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
