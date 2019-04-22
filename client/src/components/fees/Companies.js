import React, { Component } from 'react'
import CompanyItem from './CompanyItem'

class Companies extends Component {
  render () {
    return this.props.companies.map((company) => (
      <CompanyItem company={company}
        pay = {this.props.pay} root = {this.props.root} />
    ))
  }
}

export default Companies
