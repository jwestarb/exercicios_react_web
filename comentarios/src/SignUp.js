import React, { Component } from 'react'

class SignUp extends Component {
  state = {
    email: '',
    passwd: ''
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    })
  }

  createAccount = () => {
    this.props.createAccount(this.state.email, this.state.passwd)
  }

  render () {
    const errorMessages = {
      'auth/weak-password': 'Senha muito simples',
      'auth/email-already-in-use': 'Este e-mail ja esta em uso',
      'auth/invalid-email': 'Não é um e-mail válido'
    }
    return (
      <div>
        <h4>Criar Conta</h4>
        <form className='form-inline'>
          <input type='text' className='form-control mr-2' placeholder='E-mail' value={this.state.email} onChange={this.handleChange('email')} />
          <input type='password' className='form-control mr-2' placeholder='Senha' value={this.state.passwd} onChange={this.handleChange('passwd')} />
          <button type='button' className='btn btn-primary mr-2' onClick={this.createAccount}>Criar Conta</button>
          <button type='button' className='btn' onClick={() => this.props.changeScreen('login')}>Ja tenho conta, entrar</button>
        </form>
        { this.props.isSignUpError &&
          <div className='card text-white bg-danger mt-2'>
            <div className='card-body'>
              Erro: {errorMessages[this.props.signUpError]}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SignUp
