import _ from 'lodash'
import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  products: [],
  selecteds: []
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return state.merge({
        products: action.products
      })
    case types.NEW_PRODUCT:
      return state.merge({
        products: action.products
      })
      // return state.merge({
      //   products: action.products
      // })
    case types.UPDATE_PRODUCT:
      return state.merge({
        products: action.products
      })
    case types.DELET_PRODUCT:
      return state.merge({
        products: action.products
      })
    default:
      return state
  }
}

// selectors...

export function getProducts(state) {
  return state.products
}
