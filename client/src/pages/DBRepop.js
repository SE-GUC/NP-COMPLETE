import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class DBRepop extends Component {
  render() {
    return (
        <Form>
          <Button variant='primary' type='submit' onClick={e => this.clear(e)}>
         Clear and Add users
        </Button>
        <br></br>
        <Button variant='primary' type='submit' onClick={e => this.addCompanies(e)}>
          Add companies
        </Button>
        </Form>
    )

  }

  clear = e => {
    e.preventDefault()
    axios
        .delete(`/api/admins/DBRepop`)
        .then(res => alert(`DB Cleared! Wait for a few seconds then create companies`))
        .catch(error => alert(error.response.data.message))
    }

    addCompanies = e => {
        e.preventDefault()
        axios
            .post(`/api/admins/RepopCompanies`)
            .then(res => alert(`You now have new companies`))
            .catch(error => alert(error.response.data.message))
        }


}

export default DBRepop
