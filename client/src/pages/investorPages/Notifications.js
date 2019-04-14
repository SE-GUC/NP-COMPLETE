import React, { Component } from 'react'
import Mynotifications from '../../components/MyNotifications'
export class Notifications extends Component {
  render() {
    return (
      <div>
        <div className='AllMyNotifications'>
        <Mynotifications keys id={this.props.match.params.id} />
      </div>
      </div>
    )
  }
}

export default Notifications
