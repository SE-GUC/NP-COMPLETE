import React, { Component } from 'react'
// import PortalLayout from './PortalLayout'
import InternalPortalBar from '../../components/layout/InternalPortalBar'

class WorkPage extends Component {
  render () {
    const lawyerWorkList = [
      { text: 'Walk in applications', link: '/lawyers/viewAllWalkInCases' },
      { text: 'Portal Applications', link: '/lawyers/viewAllPortalCases' },
      { text: 'Start Walk in App', link: '/lawyers/fillForm' },
      { text: 'Calculate Fees', link: '/lawyers/CalcFees' },
      { text: 'Decide an application', link: '/lawyers/review' },
      { text: 'Show last worked', link: '/lawyers/showLastWorked' }
    ]
    const adminWorkList = [
      { text: 'View All Portal Applications', link: '/admins/viewAllPortalCases' },
      { text: 'View All Walk in Applications', link: '/admins/viewAllWalkInCases' },
      { text: 'Delete Admin', link: '/admins/deleteAdmin' },
      { text: 'Delete Lawyer', link: '/admins/deleteLawyer' },
      { text: 'Delete Reviwer', link: '/admins/deleteReviewer' },
      { text: 'Delete Investor', link: '/admins/deleteInvestor' },
      { text: 'Register Employees', link: '/admins/registerInternal' },
      { text: 'Publish Companies', link: '/admins/publishCompany' },
      { text: 'Show last worked', link: '/admins/showLastWorked' }
    ]

    const reviewerWorkList = [
      { text: 'Walk in applications', link: '/reviewers/viewAllWalkInCases' },
      { text: 'Portal Applications', link: '/reviewers/viewAllPortalCases' },
      { text: 'Decide an application', link: '/reviewers/acceptOrReject' },
      { text: 'Show last worked', link: '/reviewers/showLastWorked' }
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
    return (
      <h1>Log In Please!</h1>
    )
  }
}

export default WorkPage
