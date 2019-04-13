import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'
import LoginBox from '../../components/LoginBox'


class InvestorLogin extends Component {
//   constructor (props) {
//     super(props)
//   } 

    printUser = (email, password) => {
      console.log(email)
      console.log(password)
    }

     // These are the steps to store the user token at the frontend
  // however it involves alot of modifications in the backend

//   loginInvestor = (email, password) => {
// //     console.log(email)
// //     console.log(password)
// 	axios.post('http://localhost:8000/api/investors/login', {email: email, password: password})
// 	.then( res => {
// 		const { token } = res.data
// 		localStorage.setItem('jwtToken', token)
// 		 if(token) 
//         axios.defaults.headers.common['Authorization'] = token
//     else 
//      delete axios.defaults.headers.common['Authorization'] 
// 	})
// 	.catch(err => console.log('error'))	
// 	}

  render () {
    return (
      <div className='App-header'>
        <div className='box-controller'>
          <div className='box-container'>
            <LoginBox loginInvestor = {this.loginInvestor} printUser={this.printUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default InvestorLogin
