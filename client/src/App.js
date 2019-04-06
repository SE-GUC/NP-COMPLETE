import React, { Component } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Lawyer from './pages/Lawyer'
import Reviewer from './pages/Reviewer'
import ViewCases from './ViewCases'
import Investor from './pages/Investor';

class App extends Component {
 
redirectMEA = () => {
  window.location.href='deleteAdmins'
}
redirectMEL = () => {
  window.location.href='deleteLawyers'
}
redirectMEI = () => {
  window.location.href='deleteInvestor'
}
redirectMER = () => {
  window.location.href='deleteReviewer'
}
redirectMEC = () => {
  window.location.href='companies'
}
  render () {
    return (
      <Router>
        <header>
          <Route exact path='/' render={(props) => (
            <React.Fragment>
              <div className='center-div'>
                <ButtonGroup aria-label='Basic example' >
                  <Button variant='primary' onClick={this.redirectMEA}>Delete Admins</Button>
                  <Button variant='primary' onClick={this.redirectMEL}>Delete Lawyers</Button>
                  <Button variant='primary' onClick={this.redirectMER}>Delete Reviewers</Button>
                  <Button variant='primary' onClick={this.redirectMEI}>Delete Investors</Button>
                  <Button variant='primary' onClick={this.redirectMEC}>View Companies</Button>
                </ButtonGroup>
              </div>
            </React.Fragment>
          )} />
          <Route exact path='/deleteAdmins' component={Admin} />
          <Route exact path='/deleteLawyers' component={Lawyer} />
          <Route exact path='/deleteReviewer' component={Reviewer} />
          <Route exact path='/deleteInvestor' component={Investor} />
          <Route exact path='/companies' component={ViewCases} />
        </header>
      </Router>
    )
  }
}

export default App
