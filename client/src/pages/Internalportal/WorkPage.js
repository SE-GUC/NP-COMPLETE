import React, { Component } from 'react'
// import PortalLayout from './PortalLayout'
import InternalPortalBar from '../../components/layout/InternalPortalBar'

class WorkPage extends Component {
  render () {
    const lawyerWorkList = [
      { text: 'Walk in applications', link: '/lawyers/viewAllWalkInCases' },
      { text: 'Portal Applications', link: '/lawyers/viewAllPortalCases' },
      { text: 'Start Walk in App', link: '/lawyers/fillForm' }
    ]
    const adminWorkList = [
      { text: 'View All Portal Applications', link: '/admins/viewAllPortalCases' },
      { text: 'View All Walk in Applications', link: '/admins/viewAllWalkInCases' },
      { text: 'Delete User', link: '/admins/deleteAdmin' },
      { text: 'Register Employees', link: '/admins/reg' },
      { text: 'Publish Companies', link: '/admins/publishCompany' }
    ]

    const reviewerWorkList = [
      { text: 'Walk in applications', link: '/reviewers/viewAllWalkInCases' },
      { text: 'Portal Applications', link: '/reviewers/viewAllPortalCases' }
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
