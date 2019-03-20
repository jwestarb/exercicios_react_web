import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadDataIPRequest } from './actions'

class InfoIP extends Component {
  render() {
    return (
      <div>
        <h4>Info IP</h4>
        <pre>{this.props.isFetching ? <span>Carregando...</span> : this.props.data}</pre>
        <button onClick={this.props.loadData} disabled={this.props.isFetching}>
          Obter IP
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.ip.isFetching,
    data: state.ip.data,
    error: state.ip.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      console.log('teset click botão IP')
      dispatch(loadDataIPRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoIP)
