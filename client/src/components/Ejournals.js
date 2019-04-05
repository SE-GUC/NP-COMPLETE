import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button'
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
// import CardColumns from 'react-bootstrap/CardColumns'
import EjournalCard from './EjournalCard'
import axios from 'axios'

export class Ejournals extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ejornals: []
    }
  }
  componentDidMount () {
    axios
      .get('http://localhost:8000/api/users/showEstablishedCompanies')
      .then(res => this.setState({ ejornals: res.data.data }))
      .catch(err => {
        return this.setState({ error: err })
      })
  }

  render () {
    return (
      this.state.ejornals.map(ejornal => {
        return <EjournalCard data={ejornal} />
      })
    )
  }
}

export default Ejournals
