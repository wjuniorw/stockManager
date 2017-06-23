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
    let alternative = ['nenhum produto salvo localmente']
    !prods
    ? this.props.dispatch({type: types.FETCH_PRODUCTS, products: alternative})
    : this.props.dispatch({type: types.FETCH_PRODUCTS, products: prods})
  }
  render() {
    return (
      <div>
        <h1>Stock Manager</h1>

        <div className="container-fluid">
        <div className="new-prod">
        <div className="card col-md-3">
          <div className="body">
            <input className="form-control" type="text" ref="name" placeholder="nome producto" />
            <br />
            <a className="btn btn-primary" onClick={this.newProduct}>Novo Produto</a>
            <br />
          </div>
        </div>
        </div>
        <div className="edit-prod">
        <div className="card col-md-3">
          <div className="body">
            <select className="form-control" ref="toUpdate">
              <option>
                Teste
              </option>
              {
                _.map(this.props.products.products, (item, i) => {
                  return (<option key={i} value={item}>
                    {item}
                  </option>)
                })
              }
            </select>
            <br />
            <input className="form-control" type="text" ref="edit" placeholder="nome producto" />
            <br />
            <a className="btn btn-success" onClick={this.updateProduct}>Editar Produto</a>
            <br />
          </div>
        </div>
        </div>
        <div className="delet-prod">
        <div className="card col-md-3">
          <div className="header">
            Selecione o Produto
          </div>
          <div className="body">
            <select className="form-control" ref="toDel">
              {
                _.map(this.props.products.products, (item, i) => {
                  return (<option key={i} value={item}>
                    {item}
                  </option>)
                })
              }
            </select>
            <br />
            <input className="form-control" type="text"  placeholder="nome producto" />
            <br />
            <a className="btn btn-danger" onClick={this.deletProduct}>Excluir Produto</a>
            <br />
          </div>
        </div>
        </div>

        <div className="card contentProd col-md-8 col-md-offset-4">
        <div className="info-container">
          {
            _.map(this.props.products.products, this.renderBox)
          }
        </div>
        </div>
        <div className="card" style={{display: 'none'}}>
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
  updateProduct(){
    let prods = this.localProd('prod')
    let prod = prods.indexOf(this.refs.toUpdate.value)
    let upd8 = this.refs.edit.value
    let nextProd;
    (prod > -1)
    ? nextProd = prods.splice(prod, 1, upd8)
    : alert('Selecione um produto VALIDO!')
    console.log(nextProd)
    // save local...
    this.upDateprod('prod', prods)
    // atualiza reducer
    this.props.dispatch({ type: types.NEW_PRODUCT, products: prods })
  }
  deletProduct() {
    let prods = this.localProd('prod')
    let prod = prods.indexOf(this.refs.toDel.value)
    console.log('index - ', prod)
    let nextProd = prods.splice(prod, 1)
    // save local...
    this.upDateprod('prod', prods)
    // atualiza reducer...
    this.props.dispatch({ type: types.NEW_PRODUCT, products: prods })
    // this.props.dispatch({ type: types.NEW_PRODUCT, products: nextProd })
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
        <div className="info-box bg-indigo hover-expand-effect">
          <div className="icon">
            <i className="material-icons" onMouseEnter={this.reaction.bind(this, i)}>:-)</i>
          </div>
          <div className="content">
            <div className="font-25">{item}</div>
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
  reaction(it) {
    let prods = document.querySelectorAll('.icon .material-icons')
    let prod = prods[it];
    // console.log(prod);
    (prod.childNodes[0].data === ';-)')
    ? prod.childNodes[0].data = ':-*'
    : prod.childNodes[0].data = ';-)'

  }
}

// injeta props de dados vindos do reducer
function mapStateToprops(state) {
  return {
    // qwerty: ['qewrty', 'uiop', 'asdfg'],
    products: productsSelector.getProducts(state)
  }
}

export default connect(mapStateToprops)(App)
