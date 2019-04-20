import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Button } from 'react-bootstrap'
export class MyCompaniesCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
    Object.keys(this.props.data).forEach(key => {
      this.setState({ [key]: this.props.data[key] })
    })
  }
  render () {
    return (
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>{this.state.name}</Card.Title>
            <Card.Text>
              {this.state.type}
            </Card.Text>
            <Card.Text>
              {this.state.establishmentDate}
            </Card.Text>
            <Card.Text>
              {this.state.feedback}
            </Card.Text>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href = {`http://localhost:3000/investors/reviewOnlineService/` + this.state._id + `/:investorId`}>Give</NavLink>
              </NavItem>
            </Nav>
          </Card.Body>
        </Card>
      </CardDeck>

    )
  }
}

export default MyCompaniesCard
