import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Axios from 'axios';
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
    this.toggle = this.toggle.bind(this)

    this.state = {
      collapse: false,
      feedback: ''
    }
  }
  componentDidMount () {
    Object.keys(this.props.data).forEach(key => {
      this.setState({ [key]: this.props.data[key] })
    })
  }
  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  submit = () => {
    if(this.submit.length !== 0){
    this.setState({ feedback: this.submit })
    const investorId = "5cba2b7864df6c23283bea53"  //need to change this to redux
    const companyId = this.props.data._id
    Axios
    .put(`/api/investors/reviewOnlineService/${companyId}/${investorId}` , {feedback: this.submit})
    .then(res => this.setState({loading: false , done: true}))
    .catch(err => {
        console.log(err)
      })
      this.toggle()
    }
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
                <Button color='primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Give Feedback</Button>
                <Collapse isOpen={this.state.collapse}>
                  <div class='App'>
                    <label for='comment'>Comment:</label>
                    <textarea class='form-control' rows='5' id='comment' onChange={(event) => { this.submit = event.target.value }} />
                    <Button color='primary' onClick = { this.submit  } style={{ marginBottom: '1rem' }} > Submit Feedback </Button> 
                  </div>
                </Collapse>
              </NavItem>
            </Nav>
          </Card.Body>
        </Card>
      </CardDeck>

    )
  }
}

export default MyCompaniesCard
