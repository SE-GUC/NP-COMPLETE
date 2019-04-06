import React from 'react'
import './layout/loginStyle.css'

class LoginBox extends React.Component {
  

state = {
  email: '',
  password: ''
}

onChange = (e) => this.setState({[e.target.name]: e.target.value})

onClick = (e) =>
{
  this.props.printUser(this.state.email,this.state.password)
}


  render () {

    //console.log(this.state)
    
    return (
      <div className='inner-container'>

        <div className='header'>Login to the Internal portal
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
}

export default LoginBox
