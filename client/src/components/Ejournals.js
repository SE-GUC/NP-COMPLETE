import React, { Component } from 'react'
import EjournalCard from './EjournalCard'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

export class Ejournals extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      ejornals: []
    }
  }
  componentDidMount () {
    this._isMounted = true
    this.setState({ loading: true })
    axios
      .get('/api/users/showEstablishedCompanies')
      .then(res => this.setState({ ejornals: res.data.data, loading: false }))
      .catch(err => {
        return this.setState({ error: err })
      })
  }

  render () {
    return (
      this.state.loading ? <div className='App'><Spinner animation="border" variant= "primary" /></div>
        : this.state.ejornals.map(ejornal => {
          return <EjournalCard key={ejornal._id} data={ejornal} />
        })

    )
  }
}

export default Ejournals
