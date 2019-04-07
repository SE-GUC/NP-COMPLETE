import React, * as react from 'react'
import UserCard from './UserCard'

export class DeleteAccounts extends react.Component {
  render () {
    return (
      this.props.users.map(user => {
        return <UserCard data={user} ondelete={this.props.deleteMe} />
      })
    )
  }
}
export default DeleteAccounts
