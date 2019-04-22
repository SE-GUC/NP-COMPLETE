import React, { Component } from 'react'
import CompanyItem from './CompanyItem'
import PropTypes from 'prop-types'

class CompaniesPage extends Component {
  render () {
    if (localStorage.getItem('language') === 'English') {
      if (this.props.companies.length === 0) {
        return <h1> No companies established yet</h1>
      }
      return this.props.companies.map(com => (
        <CompanyItem key={com._id} com={com} />

      ))
    } else {
      if (this.props.companies.length === 0) {
        return <h1> لم يتم تاسيس شركات حتي الان</h1>
      }
      return this.props.companies.map(com => (
        <CompanyItem key={com._id} com={com} />

      ))
    }
  }
}

CompaniesPage.propTypes = {
  companies: PropTypes.array
}

export default CompaniesPage
