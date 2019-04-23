import React, * as react from 'react'
import UserCard from './UserCard'

export class DeleteAccounts extends react.Component {
  render () {
    const Card = !this.props.approve ? this.props.users.map(user => {
      return <UserCard data={user} ondelete={this.props.deleteMe} />
    })
      : this.props.users.map(user => {
        return <UserCard data={user} handleSalary={this.props.handleSalary} handleWorkingHours={this.props.handleWorkingHours} approve onApprove={this.props.approveMe} />
      })
    return Card
  }
}
export default DeleteAccounts
