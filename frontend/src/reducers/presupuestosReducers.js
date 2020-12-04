import {
  PRESUPUESTO_LIST_REQUEST,
  PRESUPUESTO_LIST_SUCCESS,
  PRESUPUESTO_LIST_FAIL,
  PRESUPUESTO_DETAILS_REQUEST,
  PRESUPUESTO_DETAILS_SUCCESS,
  PRESUPUESTO_DETAILS_FAIL,
  PRESUPUESTO_DELETE_REQUEST,
  PRESUPUESTO_DELETE_SUCCESS,
  PRESUPUESTO_DELETE_FAIL,
  PRESUPUESTO_CREATE_RESET,
  PRESUPUESTO_CREATE_FAIL,
  PRESUPUESTO_CREATE_SUCCESS,
  PRESUPUESTO_CREATE_REQUEST,
  PRESUPUESTO_UPDATE_REQUEST,
  PRESUPUESTO_UPDATE_SUCCESS,
  PRESUPUESTO_UPDATE_FAIL,
  PRESUPUESTO_UPDATE_RESET,
  PRESUPUESTO_LIST_RESET,
} from '../constants/presupuetoConstants'

export const presupuestoListReducer = (state = { presupuestos: [] }, action) => {
  switch (action.type) {
    case PRESUPUESTO_LIST_REQUEST:
      return { loading: true, presupuestos: [] }
    case PRESUPUESTO_LIST_SUCCESS:
      return {
        loading: false,
        presupuestos: action.payload.presupuestos,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRESUPUESTO_LIST_RESET:
      return { loading: true, presupuestos: []}
    case PRESUPUESTO_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const presupuestoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESUPUESTO_CREATE_REQUEST:
      return { loading: true }
    case PRESUPUESTO_CREATE_SUCCESS:
      return { loading: false, success: true, presupuesto: action.payload }
    case PRESUPUESTO_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRESUPUESTO_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const presupuestoUpdateReducer = (state = { presupuesto: {} }, action) => {
  switch (action.type) {
    case PRESUPUESTO_UPDATE_REQUEST:
      return { loading: true }
    case PRESUPUESTO_UPDATE_SUCCESS:
      return { loading: false, success: true, presupuesto: action.payload }
    case PRESUPUESTO_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRESUPUESTO_UPDATE_RESET:
      return { presupuesto: {} }
    default:
      return state
  }
}

export const presupuestoDetailsReducer = (
  state = { presupuesto: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRESUPUESTO_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRESUPUESTO_DETAILS_SUCCESS:
      return { loading: false, presupuesto: action.payload }
    case PRESUPUESTO_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
