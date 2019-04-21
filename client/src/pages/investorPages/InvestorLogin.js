import React, { Component } from 'react'
import '../../App.css'
import LoginBox from '../../components/LoginBox'

class InvestorLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirected: this.props.redirected
    }
  }
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/investor' } }

    return (
      <div className='App-header'>
        <div className='box-controller'>
          <div className='box-container'>
            <LoginBox loginInvestor={this.loginInvestor} type='investors' from={from} />
          </div>
        </div>
      </div>
    )
  }
}

export default InvestorLogin
