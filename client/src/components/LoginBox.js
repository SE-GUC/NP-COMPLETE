import React from 'react'
import './layout/loginStyle.css'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'


class LoginBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '', 
      type: props.type,
      from: this.props.from
    }
  }
  

onChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

onClick = (e) => {
  this.props.login(
    {
      "email": this.state.email,
      "password": this.state.password
    }, 
    this.state.type
  )
}

  render () {
    console.log(this.state.type)
    if(!this.props.isLoggedIn) {

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
              onClick= { this.onClick}> 
              Login 
            </button>
            
  
          </div>
  
        </div>
      )
    } else {
     
        return <Redirect to='/investor' />
      
    }
  }

 

}

LoginBox.propTypes = {
	login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
	loggedUser: state.auth.loggedUser,
})

export default connect(mapStateToProps,{ login })(LoginBox);
