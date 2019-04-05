import React, { Component } from 'react'
import CompanyItem from './CompanyItem'
import PropTypes from 'prop-types'

class CompaniesPage extends Component {
  render () {
    console.log(this.props.companies)
    return this.props.companies.map((coo) => (
     <CompanyItem key={coo._id} com={coo}/>

    ))
  }
}

CompaniesPage.propTypes = {
  companies: PropTypes.array.isRequired
}

export default CompaniesPage
