import React, { Component } from 'react'
import UserCard from './UserCard'

export class DeleteAccounts extends Component {
    
  render() {
     console.log(this.props.users.data) 
    return (
    //   <div>
          
        this.props.users.data.map(admin =>{
            return <UserCard data ={admin} ondelete={this.props.deleteMe}/>
        })
    )
  }
}

export default DeleteAccounts
// {/* <ButtonGroup aria-label="Basic example">
//   <Button variant="secondary" >Admin</Button>
//   <Button variant="secondary">Lawyer</Button>
//   <Button variant="secondary">Reviewer</Button>
//   <Button variant="secondary">Investor</Button>
// </ButtonGroup>
//         <Card style={{ width: '18rem' }}>
//   <Card.Body>
//     <Card.Title><h4>Account Type</h4></Card.Title>
//     <Card.Text>
//         <h5>s</h5>
//         <h5>m</h5>
//         <h5>o</h5>
//     </Card.Text>
//     <Button variant="danger">Delete</Button>
//     <p></p>
//     <Button variant="danger">Deactivate</Button>
//   </Card.Body>
// </Card> */}
// {/* </div> */}