import _ from 'lodash'
import types from './actionTypes'
import stockService from '../../services/stockService'

export function fetchProducts() {
  // request...
  return async(dispatch, getState) => {
    try {
      const prods = await stockService.getProducts()
      dispatch({ type: types.PRODUCTS_FETCHED, prods })
    } catch (e) {
      console.error(e)
    }
  }
}
