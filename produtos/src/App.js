import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.loadCategorias = this.loadCategorias.bind(this)
    this.readCategoria = this.readCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.createProduto = this.createProduto.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)
    this.state = {
      categoria: {},
      categorias: [],
      produtos: []
    }
  }

  loadCategorias () {
    this.props.api.loadCategorias()
      .then(res => {
        this.setState({
          categorias: res.data
        })
      })
  }

  readCategoria (id) {
    this.props.api.readCategoria(id)
      .then(res => {
        this.setState({
          categoria: res.data
        })
      })
  }

  createCategoria (categoria) {
    this.props.api.createCategoria(categoria)
      .then(res => { this.loadCategorias() })
  }

  editCategoria (categoria) {
    this.props.api.editCategoria(categoria)
      .then(res => {
        this.loadCategorias()
      })
  }

  removeCategoria (categoria) {
    this.props.api.deleteCategoria(categoria.id)
      .then(res => {
        this.loadCategorias()
      })
  }

  loadProdutos (categoria) {
    this.props.api.loadProdutos(categoria)
      .then(res => {
        this.setState({
          produtos: res.data
        })
      })
  }

  createProduto (produto) {
    return this.props.api.createProduto(produto)
  }

  readProduto (id) {
    return this.props.api.readProduto(id)
  }

  editProduto (produto) {
    return this.props.api.editProduto(produto)
  }

  removeProduto (produto) {
    return this.props.api.deleteProduto(produto.id)
  }

  render () {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <Link to='/' className='navbar-brand'>Gerenciador de Produtos</Link>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>

              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (<Produtos
                {...props}
                categoria={this.state.categoria}
                loadCategorias={this.loadCategorias}
                readCategoria={this.readCategoria}
                createCategoria={this.createCategoria}
                editCategoria={this.editCategoria}
                removeCategoria={this.removeCategoria}
                categorias={this.state.categorias}
                readProduto={this.readProduto}
                loadProdutos={this.loadProdutos}
                createProduto={this.createProduto}
                produtos={this.state.produtos}
                removeProduto={this.removeProduto}
                editProduto={this.editProduto}
              />)
            }} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
