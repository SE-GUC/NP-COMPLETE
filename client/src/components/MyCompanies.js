import React, { Component } from 'react'
import MyCompanyCard from './MyCompanyCard'
import axios from 'axios'
export class MyCompanies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      companies: []
    }
  }
  componentDidMount () {
    const { id } = this.props
    axios
      .get(`http://localhost:8000/api/investors/getCompanies/${id}`)
      .then(res => this.setState({ companies: res.data.data }))
      .catch(err => {
        return this.setState({ error: err })
      })
  }
  render () {
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

export default MyCompanies
