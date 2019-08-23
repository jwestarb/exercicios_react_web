import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categoria extends Component {
  constructor (props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.renderProduto = this.renderProduto.bind(this)
    this.state = {
      id: null
    }
  }

  loadData (id) {
    this.setState({ id })
    this.props.readCategoria(id)
    this.props.loadProdutos(id)
  }

  componentDidMount () {
    this.loadData(this.props.match.params.catId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId)
    }
  }

  renderProduto (produto) {
    return (
      <p className='well' key={produto.id}>
        {produto.produto}
        <button onClick={() => { this.props.removeProduto(produto).then(res => this.loadData(this.props.match.params.catId)) }}>Excluir</button>
        <Link to={'/produtos/editar/' + produto.id}>Editar</Link>
      </p>
    )
  }

  render () {
    return (
      <div>
        <h1>{ this.props.categoria.categoria }</h1>
        { this.props.produtos.length === 0 && <p>Nenhum produto cadastrado.</p> }
        { this.props.produtos.map(this.renderProduto) }
      </div>
    )
  }
}

export default Categoria
