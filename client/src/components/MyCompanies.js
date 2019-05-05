import React, { Component } from 'react'
import MyCompanyCard from './MyCompanyCard'
import axios from 'axios'
import { Spinner, Alert } from 'react-bootstrap'

export class MyCompanies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      companies: []
    }
  }
  componentDidMount () {
    const { id } = this.props
    this.setState({ loading: true, error: false })
    axios
      .get(`/api/investors/getCompanies/${id}`)
      .then(res => this.setState({ companies: res.data.data, loading: false }))
      .catch(err => {
        return this.setState({ error: true, loading: false })
      })
  }
  render () {
    if (this.state.loading) {
      return <div className='App'><Spinner animation='border' variant='primary' /></div>
    } else {
      if (this.state.companies === []) {
        return <Alert className='App' variant='danger'>No Companies to display</Alert>
      }
      return (

        this.state.companies.map(company => {
          return <MyCompanyCard key={company._id} data={company} />
        })
      )
    }
  }
}

export default MyCompanies
