import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {
  constructor (props) {
    super(props)
    this.handleEditProduto = this.handleEditProduto.bind(this)
    this.state = {
      redirect: false
    }
  }

  componentDidMount () {
    this.props.readProduto(this.props.match.params.id)
      .then((res) => {
        this.refs.categoria.value = res.data.categoria
        this.refs.produto.value = res.data.produto
      })
  }

  handleEditProduto () {
    const produto = {
      id: this.props.match.params.id,
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.editProduto(produto)
      .then((res) => {
        this.setState({ redirect: `/produtos/categoria/${res.data.categoria}` })
      })
  }

  render () {
    const { categorias } = this.props
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <h2>Editar Produto</h2>
        <select ref='categoria' className='form-control'>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)}
        </select>
        <input type='text' ref='produto' className='form-control' placeholder='Nome do produto' />
        <button className='btn btn-primary' onClick={this.handleEditProduto}>Salvar</button>
      </div>
    )
  }
}

export default ProdutosEditar
