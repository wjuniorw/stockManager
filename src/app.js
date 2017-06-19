import React, { Component } from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import _ from 'lodash'
import * as types from './store/products/actionTypes'
// import selectors...
import * as productsSelector from './store/products/reducer'
// import containers...


class App extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  componentDidMount() {
    let prods = this.localProd('prod')
    this.props.dispatch({type: types.FETCH_PRODUCTS, products: prods})
  }
  render() {
    return (
      <div>
        <h1>Stock Manager</h1>
        <input type="text" ref="name" placeholder="nome producto" />
        <br />
        <input type="button" value="novo producto" onClick={this.newProduct} />
        <br />
        <h3>Lista de productos</h3>
        <h4>
        <ul>
          {
            _.map(this.props.products.products, this.renderProd)
          }
        </ul>
        </h4>
      </div>
    )
  }
  newProduct() {
    let prod = {}
    prod.products = this.localProd('prod')
    let atual = [this.refs.name.value]
    if (prod.products === null) {
      this.localSet('prod', atual)
    }
    else {
      let current = this.localProd('prod')
      current.push(this.refs.name.value)
      console.log('log--0', current)
      let up = this.upDateprod('prod', current)
      console.log('log-t', up)
      prod.products = current
      // console.log('log-0', prod.products, current)
    }
    console.log('log-1', prod)
    let current = prod.products
    this.props.dispatch({ type: types.NEW_PRODUCT, products: current })
    console.log(prod)
  }
  renderProd(item) {
    return (  <li key={item}>
                {item}
              </li>
            )
  }
  prodToJson(str) {
    return JSON.parse(str)
  }
  prodToStr(str) {
    return JSON.stringify(str)
  }
  upDateprod(str, obj) {
    localStorage.removeItem(str)
    localStorage.setItem(str, this.prodToStr(obj))
    return this.prodToJson(localStorage.getItem(str))
  }
  localProd(str) {
    return this.prodToJson(localStorage.getItem(str))
  }
  localSet(str, obj) {
    // return this.prodToStr(localStorage.setItem(str, obj))
    return localStorage.setItem(str, this.prodToStr(obj))
  }
}

// injeta props de dados vindos do reducer
function mapStateToprops(state) {
  return {
    qwerty: ['qewrty', 'uiop', 'asdfg'],
    products: productsSelector.getProducts(state)
  }
}

export default connect(mapStateToprops)(App)
