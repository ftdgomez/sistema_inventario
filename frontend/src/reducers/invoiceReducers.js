import {
  INVOICE_LIST_REQUEST,
  INVOICE_LIST_SUCCESS,
  INVOICE_LIST_FAIL,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
  INVOICE_DETAILS_FAIL,
  INVOICE_DELETE_REQUEST,
  INVOICE_DELETE_SUCCESS,
  INVOICE_DELETE_FAIL,
  INVOICE_CREATE_RESET,
  INVOICE_CREATE_FAIL,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_REQUEST,
  INVOICE_UPDATE_REQUEST,
  INVOICE_UPDATE_SUCCESS,
  INVOICE_UPDATE_FAIL,
  INVOICE_UPDATE_RESET,
  INVOICE_LIST_RESET,
} from '../constants/invoiceConstants'

export const invoiceListReducer = (state = { invoices: [] }, action) => {
  switch (action.type) {
    case INVOICE_LIST_REQUEST:
      return { loading: true, invoices: [] }
    case INVOICE_LIST_SUCCESS:
      return {
        loading: false,
        invoices: action.payload.invoices,
        success: true,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case INVOICE_LIST_RESET:
      return { loading: true, invoices: []}
    case INVOICE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const invoiceDetailsReducer = (
  state = { invoice: {} },
  action
) => {
  switch (action.type) {
    case INVOICE_DETAILS_REQUEST:
      return { loading: true, invoice: {} }
    case INVOICE_DETAILS_SUCCESS:
      return { loading: false, invoice: action.payload, success: true }
    case INVOICE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case 'INVOICE_DETAILS_RESET':
      return {loading: true, invoice: {}}
    default:
      return state
  }
}


export const invoiceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_CREATE_REQUEST:
      return { loading: true }
    case INVOICE_CREATE_SUCCESS:
      return { loading: false, success: true, createdInvoice: action.payload }
    case INVOICE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case INVOICE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const invoiceUpdateReducer = (state = { invoice: {} }, action) => {
  switch (action.type) {
    case INVOICE_UPDATE_REQUEST:
      return { loading: true }
    case INVOICE_UPDATE_SUCCESS:
      return { loading: false, success: true, invoice: action.payload }
    case INVOICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case INVOICE_UPDATE_RESET:
      return { invoice: {} }
    default:
      return state
  }
}

export const invoiceDeleteReducer = (state = { invoice: {} }, action) => {
  switch (action.type) {
    case INVOICE_DELETE_REQUEST:
      return { loading: true }
    case INVOICE_DELETE_SUCCESS:
      return { loading: false, success: true, invoice: action.payload }
    case INVOICE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

