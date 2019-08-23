import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'
import Categoria from './Categoria'

class Produtos extends Component {
  constructor (props) {
    super(props)
    this.handleNewCategoria = this.handleNewCategoria.bind(this)
    this.handleEditCategoria = this.handleEditCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
    this.state = {
      editingCategoria: ''
    }
  }

  componentDidMount () {
    this.props.loadCategorias()
  }

  handleNewCategoria (key) {
    if (key.keyCode === 13) {
      this.props.createCategoria({ categoria: this.refs.categoria.value })
      this.refs.categoria.value = ''
    }
  }

  editCategoria (categoria) {
    this.setState({
      editingCategoria: categoria.id
    })
  }

  handleEditCategoria (key) {
    if (key.keyCode === 13) {
      this.props.editCategoria({ id: this.state.editingCategoria, categoria: this.refs['edcat-' + this.state.editingCategoria].value })
      this.cancelEditing()
    }
  }

  cancelEditing () {
    this.setState({
      editingCategoria: ''
    })
  }

  renderCategorias (cat) {
    return (
      <li key={cat.id}>
        {this.state.editingCategoria === cat.id &&
        <div className='input-group'>
          <div className='input-group-btn'>
            <input type='text' className='form-control' ref={'edcat-' + cat.id} defaultValue={cat.categoria} onKeyUp={this.handleEditCategoria} />
            <button className='btn' onClick={this.cancelEditing}>cancel</button>
          </div>
        </div>}
        {this.state.editingCategoria !== cat.id &&
        <div>
          <button className='btn btn-sm' onClick={() => this.props.removeCategoria(cat)}>
            <span className='glyphicon glyphicon-remove' />
          </button>
          <button className='btn btn-sm' onClick={() => this.editCategoria(cat)}>
            <span className='glyphicon glyphicon-pencil' />
          </button>
          <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
        </div>}
      </li>
    )
  }

  render () {
    const { match, categorias } = this.props
    return (
      <div className='row'>
        <div className='col-md-2'>
          <h3>Categorias</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categorias.map(cat => this.renderCategorias(cat))}
          </ul>
          <div className='well well-sm'>
            <input type='text' className='form-control' ref='categoria' placeholder='Nova Categoria' onKeyUp={this.handleNewCategoria} />
          </div>
          <Link to={match.url + '/novo'}>Novo Produto</Link>
        </div>
        <div className='col-md-10'>
          <h1>Produtos: {this.props.match.url}</h1>
          <Route exact path={match.url} component={ProdutosHome} />
          <Route exact path={match.url + '/novo'}
            render={(props) => {
              return <ProdutosNovo {...props}
                categorias={categorias}
                createProduto={this.props.createProduto} />
            }} />
          <Route exact path={match.url + '/editar/:id'}
            render={(props) => {
              return <ProdutosEditar {...props}
                categorias={categorias}
                readProduto={this.props.readProduto}
                editProduto={this.props.editProduto}
              />
            }}
          />
          <Route exact path={match.url + '/categoria/:catId'}
            render={(props) => {
              return <Categoria {...props}
                readCategoria={this.props.readCategoria}
                categoria={this.props.categoria}
                produtos={this.props.produtos}
                loadProdutos={this.props.loadProdutos}
                removeProduto={this.props.removeProduto}
              />
            }}
          />
        </div>
      </div>
    )
  }
}

export default Produtos
