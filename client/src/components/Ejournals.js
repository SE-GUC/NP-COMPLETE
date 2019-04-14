import React, { Component } from 'react'
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
      .get('/api/users/showEstablishedCompanies')
      .then(res => this.setState({ ejornals: res.data.data }))
      .catch(err => {
        return this.setState({ error: err })
      })
  }

  render () {
    return (
      this.state.ejornals.map(ejornal => {
        return <EjournalCard key={ejornal._id} data={ejornal} />
      })
    )
  }
}

export default Ejournals
