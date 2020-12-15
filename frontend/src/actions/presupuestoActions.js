import axios from 'axios'
import {
  PRESUPUESTO_LIST_REQUEST,
  PRESUPUESTO_LIST_SUCCESS,
  PRESUPUESTO_LIST_FAIL,
  PRESUPUESTO_LIST_RESET,
  PRESUPUESTO_DETAILS_REQUEST,
  PRESUPUESTO_DETAILS_SUCCESS,
  PRESUPUESTO_DETAILS_FAIL,
  PRESUPUESTO_DELETE_SUCCESS,
  PRESUPUESTO_DELETE_REQUEST,
  PRESUPUESTO_DELETE_FAIL,
  PRESUPUESTO_CREATE_REQUEST,
  PRESUPUESTO_CREATE_SUCCESS,
  PRESUPUESTO_CREATE_FAIL,
  PRESUPUESTO_UPDATE_REQUEST,
  PRESUPUESTO_UPDATE_SUCCESS,
  PRESUPUESTO_UPDATE_FAIL,

} from '../constants/presupuetoConstants'
import { logout } from '../actions/userActions'

export const listPresupuestos = (keyword = '', pageNumber = '', pageSize = 20) => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: PRESUPUESTO_LIST_REQUEST })
    
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/presupuestos?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`, config
    )

    dispatch({
      type: PRESUPUESTO_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRESUPUESTO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const resetListPresupuestos = () => async (
  dispatch
) => {
  try {
    dispatch({ type: PRESUPUESTO_LIST_RESET })

  } catch (error) {
    dispatch({
      type: PRESUPUESTO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const listPresupuestoDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRESUPUESTO_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/presupuestos/${id}`)
    console.log(data)

    dispatch({
      type: PRESUPUESTO_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRESUPUESTO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPresupuesto = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESUPUESTO_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/presupuestos`, productData, config)

    dispatch({
      type: PRESUPUESTO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRESUPUESTO_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updatePresupuesto = (presupuesto) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESUPUESTO_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/presupuestos/${presupuesto._id}`,
      presupuesto,
      config
    )

 /*    console.log(data) */
    dispatch({
      type: PRESUPUESTO_UPDATE_SUCCESS,
      payload: data,
    })
    /* dispatch({ type: PRESUPUESTO_DETAILS_SUCCESS, payload: data }) */
  /*   dispatch({ type: 'PRESUPUESTO_DETAILS_RESET' }) */
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRESUPUESTO_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deletePresupuesto = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESUPUESTO_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.delete(
      `/api/presupuestos/${id}`,
      config,
    )

    dispatch({
      type: PRESUPUESTO_DELETE_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRESUPUESTO_DELETE_FAIL,
      payload: message,
    })
  }
}
