import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadDataUARequest } from './actions'

class InfoUA extends Component {
  render() {
    return (
      <div>
        <h4>Info User-agent</h4>
        <pre>{this.props.isFetching ? <span>Carregando...</span> : this.props.data}</pre>
        <button onClick={this.props.loadData} disabled={this.props.isFetching}>
          Obter User-agent
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.ua.isFetching,
    data: state.ua.data,
    error: state.ua.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(loadDataUARequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoUA)
