import React, { Component } from 'react'
// import PortalLayout from './PortalLayout'
import InternalPortalBar from '../../components/layout/InternalPortalBar'

class WorkPage extends Component {
  render () {
    const lawyerWorkList = [
      { text: 'Walk in applications', link: '/lawyers/viewAllCases' },
      { text: 'Portal Applications', link: '/lawyers/viewAllCases' },
      { text: 'Start Walk in App', link: '/lawyers/fillForm' }
    ]
    const adminWorkList = [
      { text: 'View All Cases', link: '/admins/viewAllCases' },
      { text: 'Delete User', link: '/admins/deleteAdmin' }
    ]

    const reviewerWorkList = [
      { text: 'Walk in applications', link: '/reviewers/viewAllCases' },
      { text: 'Portal Applications', link: '/reviewers/viewAllCases' }
    ]

    if (localStorage.getItem('type') === 'Lawyer') {
      return (
        <InternalPortalBar workList={lawyerWorkList} />
      )
    }
    if (localStorage.getItem('type') === 'Reviewer') {
      return (
        <InternalPortalBar workList={reviewerWorkList} />
      )
    }
    if (localStorage.getItem('type') === 'Admin') {
      return (
        <InternalPortalBar workList={adminWorkList} />
      )
    }
    return(
      <h1>Log In Please!</h1>
    )
  }
}

export default WorkPage
