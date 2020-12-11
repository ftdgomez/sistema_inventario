import axios from 'axios'
import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_SUCCESS,
  INVOICE_LIST_FAIL,
  INVOICE_LIST_RESET,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_DETAILS_FAIL,
  INVOICE_DELETE_SUCCESS,
  INVOICE_DELETE_REQUEST,
  INVOICE_DELETE_FAIL,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAIL,
  INVOICE_UPDATE_REQUEST,
  INVOICE_UPDATE_SUCCESS,
  INVOICE_UPDATE_FAIL,

} from '../constants/invoiceConstants'
import { logout } from '../actions/userActions'

export const listInvoices = (keyword = '', pageNumber = '', pageSize = 20) => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: INVOICE_LIST_REQUEST })
    
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/invoices?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`, config
    )

    console.log(data)

    dispatch({
      type: INVOICE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVOICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const resetListInvoice = () => async (
  dispatch
) => {
  try {
    dispatch({ type: INVOICE_LIST_RESET })

  } catch (error) {
    dispatch({
      type: INVOICE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const listInvoiceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVOICE_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/invoices/${id}`, config)
    console.log(data)
    dispatch({
      type: INVOICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVOICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createInvoice = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVOICE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/invoices`, productData, config)

    dispatch({
      type: INVOICE_CREATE_SUCCESS,
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
      type: INVOICE_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateInvoice = (presupuesto) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVOICE_UPDATE_REQUEST,
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
      `/api/invoices/${presupuesto._id}`,
      presupuesto,
      config
    )

 /*    console.log(data) */
    dispatch({
      type: INVOICE_UPDATE_SUCCESS,
      payload: data,
    })
    /* dispatch({ type: INVOICE_DETAILS_SUCCESS, payload: data }) */
  /*   dispatch({ type: 'INVOICE_DETAILS_RESET' }) */
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: INVOICE_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteInvoice = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVOICE_DELETE_REQUEST,
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
      `/api/invoices/${id}`,
      config,
    )

    dispatch({
      type: INVOICE_DELETE_SUCCESS,
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
      type: INVOICE_DELETE_FAIL,
      payload: message,
    })
  }
}
