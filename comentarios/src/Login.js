import React, { Component } from 'react'

class Login extends Component {
  state = {
    email: '',
    passwd: ''
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    })
  }

  login = () => {
    this.props.login(this.state.email, this.state.passwd)
  }

  render () {
    const errorMessages = {
      'auth/wrong-password': 'E-mail e/ou senha inválidos',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/invalid-email': 'Não é um e-mail válido'
    }
    return (
      <div>
        <h4>Entre para comentar</h4>
        <form className='form-inline'>
          <input type='text' className='form-control mr-2' placeholder='E-mail' value={this.state.email} onChange={this.handleChange('email')} />
          <input type='password' className='form-control mr-2' placeholder='Senha' value={this.state.passwd} onChange={this.handleChange('passwd')} />
          <button type='button' className='btn btn-primary mr-2' onClick={this.login}>Entrar</button>
          <button type='button' className='btn' onClick={() => this.props.changeScreen('signup')}>Criar Conta</button>
        </form>
        { this.props.isAuthError &&
          <div className='card text-white bg-danger mt-2'>
            <div className='card-body'>
              Erro: {errorMessages[this.props.authError]}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Login
