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

        <div className="container-fluid">
        <div className="new-prod">
        <div className="card col-md-offset-6">
          <div className="body">
            <input className="form-control" type="text" ref="name" placeholder="nome producto" />
            <br />
            <a className="btn btn-primary" onClick={this.newProduct}>Novo Produto</a>
            <br />
          </div>
        </div>
        </div>

        <div className="card contentProd">
        <div className="info-container">
          {
            _.map(this.props.products.products, this.renderBox)
          }
        </div>
        </div>
        <div className="card">
          <h3 className="header">Lista de productos</h3>
          <h4>
            Teste...
          </h4>
          <ul>
            {
              _.map(this.props.products.products, this.renderProd)
            }
          </ul>
        </div>
      </div>

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
      current.unshift(this.refs.name.value)
      // current.push(this.refs.name.value)
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
  renderBox(item, i) {
    return (
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={i}>
        <div className="info-box-3 bg-indigo hover-expand-effect">
          <div className="icon">
            <i className="material-icons">{item}</i>
              </div>
              <div className="content">
                <div className="text">NEW PRODUCT</div>
                <div className="number count-to" data-from="0" data-to="{i}" data-speed="1000" data-fresh-interval="20">{i + 1}</div>
              </div>
        </div>
      </div>
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
