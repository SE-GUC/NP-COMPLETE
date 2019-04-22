import React, { Component } from 'react'
import PortalLayout from './PortalLayout'

class WorkPage extends Component {
  render () {
    const workList = [
      { text: 'Walk in applications', link: '/admins/viewAllCases' },
      { text: 'Portal Applications', link: '/admins/viewAllCases' },
      { text: 'Start Walk in App', link: '/lawyers/fillForm' }
    ]
    return (
      <PortalLayout workList={workList}>
        <h1>Hi</h1>
      </PortalLayout>
    )
  }
}

export default WorkPage
