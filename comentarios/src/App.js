import React, { Component } from 'react'
import 'bootstrap-css-only'

import NewComment from './NewComment'
import Comments from './Comments'
import Login from './Login'
import User from './User'
import SignUp from './SignUp'

class App extends Component {
  state = {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: '',
    user: {},
    userScreen: 'login',
    signUpError: '',
    isSignUp: false
  }
  sendComment = comment => {
    const { database } = this.props
    const id = database.ref().child('comments').push().key
    const comments = {}
    comments['comments/' + id] = {
      comment,
      email: this.state.user.email,
      userid: this.state.user.uid
    }
    database.ref().update(comments)
    /* this.setState({
      comments: [...this.state.comments, comment ],
    }) */
  }

  login = async (email, passwd) => {
    const { auth } = this.props
    this.setState({
      isAuthError: false,
      authError: ''
    })
    try {
      await auth.signInWithEmailAndPassword(email, passwd)
      // console.log('Logou: ', user)
    } catch (err) {
      // console.log('Erro: ', err)
      this.setState({
        isAuthError: true,
        authError: err.code
      })
    }
  }

  logout = () => {
    const { auth } = this.props
    auth.signOut()
  }

  componentDidMount () {
    const { database, auth } = this.props
    this.setState({ isLoading: true })
    this.comments = database.ref('comments')
    this.comments.on('value', snapshot => {
      this.setState({
        comments: snapshot.val(),
        isLoading: false
      })
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true,
          user
        })
      } else {
        this.setState({
          isAuth: false,
          user: {}
        })
      }
      // console.log(user)
    })
  }

  createAccount = async (email, passwd) => {
    const { auth } = this.props
    this.setState({
      isSignUpError: false,
      signUpError: ''
    })
    try {
      await auth.createUserWithEmailAndPassword(email, passwd)
      // console.log('Logou: ', user)
    } catch (err) {
      // console.log('Erro: ', err)
      this.setState({
        isSignUpError: true,
        signUpError: err.code
      })
    }
  }

  changeScreen = (screen) => {
    this.setState({
      userScreen: screen
    })
  }

  render () {
    return (
      <div className='container mt-3'>
        { this.state.isAuth && <User email={this.state.user.email} logout={this.logout} /> }
        { !this.state.isAuth && this.state.userScreen === 'login' &&
          <Login login={this.login} isAuthError={this.state.isAuthError} authError={this.state.authError} changeScreen={this.changeScreen} />
        }
        { !this.state.isAuth && this.state.userScreen === 'signup' &&
          <SignUp createAccount={this.createAccount} isSignUpError={this.state.isSignUpError} signUpError={this.state.signUpError} changeScreen={this.changeScreen} />
        }
        { this.state.isAuth && <NewComment sendComment={this.sendComment} /> }
        <Comments comments={this.state.comments} />
        {
          this.state.isLoading && <p>Carregando...</p>
        }
        {/* <div>{JSON.stringify(this.state)}</div> */}
      </div>
    )
  }
}

export default App
