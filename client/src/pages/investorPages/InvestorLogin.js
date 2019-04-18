import React, { Component } from 'react'
import '../../App.css'
import LoginBox from '../../components/LoginBox'
import { Link } from 'react-router-dom'



class InvestorLogin extends Component {

    printUser = (email, password) => {
      console.log(email)
      console.log(password)
    }
  render () {
    return (
      <div className='App-header'>
        <div className='box-controller'>
          <div className='box-container'>
            <LoginBox loginInvestor = {this.loginInvestor} printUser={this.printUser} />
          </div>
          <ul>
            <li><Link to="../forgetPassword">Forget your password?</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default InvestorLogin
