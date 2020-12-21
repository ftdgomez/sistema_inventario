import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import InlineLoader from '../components/InlineLoader'
import FormContainer from '../components/FormContainer'
import {toast} from 'react-toastify'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (error)
    {
      toast.error(error)
    }
  }, [history, userInfo, redirect, error])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
    } else {
      dispatch(register(name, email, password, address, phone, match.params.apikey))
    }
  }

  return (
    <FormContainer>
      <h3>Registro de usuario (tienda)</h3>
      {loading && <InlineLoader />}
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>Nombre De Tienda</Form.Label>
              <Form.Control
                placeholder='Ejemplo: La Candelaria'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email de acceso'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Group>
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            placeholder='Dirección'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Teléfono Contacto</Form.Label>
          <Form.Control
            type=''
            placeholder='Teléfono de contacto'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Su contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm contraseña'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' className="btn-block" variant='primary'>
          Registrar
        </Button>
      </Form>
{/* 
      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
  )
}

export default RegisterScreen
