import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class CalcFees extends Component {
    
    state = {
    }

    render () {
      if (localStorage.getItem('language') === 'English') {
        return (
          <Form>
            <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
              Calculate Fees
            </Button>
          </Form>
        )
      }
      else{
        return (
          <Form>
            <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
              احسب التكاليف
            </Button>
          </Form>
        )
      }
    }
      clicked = e => {
        e.preventDefault()
        const {companyId} = this.props.match.params
        axios
            .get(`/api/lawyers/calculateFees/${companyId}`)
            .then(res => alert(`This company needs to pay ${res.data.company.fees}`))
            .catch(error => alert(error.response.message))
        } 
}

export default CalcFees
