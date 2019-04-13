import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class ChooseCompanyType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render () {
    return (
      <div className='App'>
        <h1>Choose your company type</h1>
        <Button style={btnStyle} href='https://www.google.com/'>SSC</Button> 
        <Button style={btnStyle} href='https://www.facebook.com/'>SPC</Button>

      </div>

    )
  }
}

const btnStyle = {
  background: '#00a0ff',
  color: 'fff',
  border: 'none',
  padding: '10px 90px',
  cursor: 'pointer',
  float: 'center',
  fontSize: 20,
  margin: '20px',
  hover: true
}

export default ChooseCompanyType
