import React from 'react'
import './layout/loginStyle.css'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'


class LoginBox extends React.Component {
  
state = {
  email: '',
  password: '', 
  route: false
}

onChange = (e) => {
 
  this.setState({[e.target.name]: e.target.value})
}

onClick = (e) =>
{
  this.props.printUser(this.state.email, this.state.password)
  this.props.login(
    {
      "email": this.state.email,
      "password": this.state.password
    }
  )
}

  render () {
    if(!this.props.isLoggedIn) {

      if(localStorage.getItem('language') === 'English'){
      return (
        <div className='inner-container'>
  
          <div className='header'>Login
          </div>
  
          <div className='box'>
  
            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input type='text' name='email' className='login-input' placeholder='Email'
              value={this.state.email} onChange={this.onChange}/>
            </div>
  
            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' className='login-input' placeholder='Password' 
              value={this.state.password} onChange={this.onChange}/>
            </div>
  
            <button type='button' 
              className='login-btn' 
              onClick= { ()  => {
                 this.onClick()
                this.setState({route: true})
                } }> 
              Login 
            </button>
            
  
          </div>
  
        </div>
      )
    }
    else{
      return (
        <div className='inner-container'>
  
          <div className='header'>تسجيل الدخول
          </div>
  
          <div className='box'>
  
            <div className='input-group'>
              <label htmlFor='email'>البريد الالكتروني</label>
              <input type='text' name='email' className='login-input' placeholder='Email'
              value={this.state.email} onChange={this.onChange}/>
            </div>
  
            <div className='input-group'>
              <label htmlFor='password'>كلمة السر</label>
              <input type='password' name='password' className='login-input' placeholder='Password' 
              value={this.state.password} onChange={this.onChange}/>
            </div>
  
            <button type='button' 
              className='login-btn' 
              onClick= { ()  => {
                 this.onClick()
                this.setState({route: true})
                } }> 
              تسجيل الدخول 
            </button>
            
  
          </div>
  
        </div>
      )
    }
    } else {
      // return <Redirect to='/admins/deleteAdmin' />
      // if(this.props.isLoggedIn){
        return <Redirect to='/investor' />
        
      // } else {
      //   alert('Log in failed')
      // }
      
    }
  }

}

LoginBox.propTypes = {
	login: PropTypes.func.isRequired
	// logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
	loggedUser: state.auth.loggedUser,
})

export default connect(mapStateToProps,{ login })(LoginBox);
