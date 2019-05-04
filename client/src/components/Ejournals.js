import React, { Component } from 'react'
import EjournalCard from './EjournalCard'
import axios from 'axios'
import { Spinner, Alert } from 'react-bootstrap'

export class Ejournals extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      ejornals: []
    }
  }
  componentDidMount () {
    this._isMounted = true
    this.setState({ loading: true, error: false })
    axios
      .get('/api/users/showEstablishedCompanies')
      .then(res => this.setState({ ejornals: res.data.data, loading: false }))
      .catch(err => this.setState({ error: true, loading: false }))
  }

  render () {
    return (
      this.state.error ? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert> : (
        this.state.loading ? <div className='App'><Spinner animation='border' variant='primary' /></div>
          : this.state.ejornals.map(ejornal => {
            return <EjournalCard key={ejornal._id} data={ejornal} />
          })
      )
    )
  }
}

export default Ejournals
