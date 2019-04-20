import React, { Component } from 'react'
import PortalLayout from './PortalLayout'

class WorkPage extends Component {
  render () {
    const workList = [
      { text: 'Walk in applications', link: '/investor' },
      { text: 'Portal Applications', link: '/investors/fillForm' },
      { text: 'fillForm', link: '/investors/fillForm' }
    ]
    return (
      <PortalLayout workList={workList}>
        <h1>Hi</h1>
      </PortalLayout>
    )
  }
}

export default WorkPage
