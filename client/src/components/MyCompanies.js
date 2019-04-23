import React, { Component } from 'react'
import MyCompanyCard from './MyCompanyCard'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

export class MyCompanies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      companies: []
    }
  }
  componentDidMount () {
    const { id } = this.props
    this.setState({ loading: true })
    axios
      .get(`http://localhost:8000/api/investors/getCompanies/${id}`)
      .then(res => this.setState({ companies: res.data.data , loading: false }))
      .catch(err => {
        return this.setState({ error: err , loading: false })
      })
  }
  render () {
    if (this.state.loading) {
      return <div className='App'><Spinner animation="border" variant="primary" /></div>
    } else {
      if (this.state.companies === []) {
        return <h1> No Companies to display </h1>
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
