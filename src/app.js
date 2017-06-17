import React, { Component } from 'react'
import { connect } from 'react-redux'
// import selectors...

// import containers...


class App extends Component {
  render() {
    return (
      <h1>Stock Manager</h1>
    )
  }
}

// injeta props de dados vindos do reducer
function mapStateToprops(state) {
  return {
    qwerty: ['qewrty', 'uiop', 'asdfg']
  }
}

export default connect(mapStateToprops)(App)
