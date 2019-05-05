import React, * as react from 'react'
import UserCard from './UserCard'

export class DeleteAccounts extends react.Component {
  render () {
    return (
      (this.props.users)
        ? this.props.users.map(user => {
          return <UserCard data={user} ondelete={this.props.deleteMe} />
        })
        : <h1>It looks like something went wrong</h1>
    )
  }
}
export default DeleteAccounts
