import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosNovo extends Component {
  constructor (props) {
    super(props)
    this.handleNewProduto = this.handleNewProduto.bind(this)
    this.state = {
      redirect: false
    }
  }

  handleNewProduto () {
    const produto = {
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.createProduto(produto)
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
        <h2>Novo Produto</h2>
        <select ref='categoria' className='form-control'>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)}
        </select>
        <input type='text' ref='produto' className='form-control' placeholder='Nome do produto' />
        <button className='btn btn-primary' onClick={this.handleNewProduto}>Salvar</button>
      </div>
    )
  }
}

export default ProdutosNovo
