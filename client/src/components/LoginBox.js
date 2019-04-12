import React from 'react'
import './layout/loginStyle.css'
//import axios from 'axios'

class LoginBox extends React.Component {
  
state = {
  email: '',
  password: '', 
}

onChange = (e) => {
 
  this.setState({[e.target.name]: e.target.value})
}

onClick = (e) =>
{
  this.props.printUser(this.state.email,this.state.password)
}

  render () {
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

          <button type='button' className='login-btn' onClick= {this.onClick}> Login  </button>
          

        </div>

      </div>
    )
  }

  // These are the steps to store the user  token at the frontend
  // however it involves alot of additions in the backend
//   login = (email, password) => {

//     console.log(email)
//     console.log(password)
  
// 	axios.post('http://localhost:8000/api/investors/login', {email: email, password: password})
// 	.then( res => {
// 		const { token } = res.data
// 		localStorage.setItem('jwtToken', token)
// 		setAuthToken(token)
// 	})
// 	.catch(err => console.log('error'))	
// 	}
  

// const setAuthToken = token => {
//     if(token) 
//         axios.defaults.headers.common['Authorization'] = token
//     else 
//      delete axios.defaults.headers.common['Authorization'] 
// }

}

export default LoginBox
