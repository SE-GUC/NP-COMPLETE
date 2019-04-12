import React from 'react'
import './layout/loginStyle.css'
import axios from 'axios'

class LoginBox extends React.Component {
  
state = {
  email: '',
  password: '', 
  investorData: ''
}


onChange = (e) => {
 
  this.setState({[e.target.name]: e.target.value})
  this.setState( {investorData:{'email': this.state.email, 'password': this.state.password}})

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

          <button type='button' className='login-btn' onClick= {this.login(this.state.investorData)}> Login  </button>
          

        </div>

      </div>
    )
  }

  login = (InvestorData) => {

    console.log(InvestorData)
  
	axios.post('http://localhost:8000/api/investors/login', InvestorData)
	.then( res => {
		const { token } = res.data
		localStorage.setItem('jwtToken', token)
		setAuthToken(token)
	})
	.catch(err => console.log('error'))	
	}
  }


const setAuthToken = token => {
    if(token) 
        axios.defaults.headers.common['Authorization'] = token
    else 
     delete axios.defaults.headers.common['Authorization'] 
}

export default LoginBox
