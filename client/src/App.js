import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/generic/Header'
import ViewForm from './pages/investorPages/ViewRejectedForms'
import Tracker from './pages/investorPages/Tracker'
import ViewCases from './pages/ViewCases'
import Faqs from './pages/investorPages/Faqs'
import Ejournals from './pages/CompaniesEjournals'
import Register from './pages/investorPages/Register'

import './App.css'

class App extends Component {
  render () {
    return (

      <Router>
        <div className='App'>

          <div className='Header'>
            <Header />
          </div>

          <div className='Container'>

            <Route exact path='/' render={props => (
              <React.Fragment>
                <h1> Welcome to Gafi Web</h1>
              </React.Fragment>
            )} />

            <Route exact path='/investors/viewRejected/:id' component={ViewForm} />

            <Route exact path='/investors/tracker/:id' component={Tracker} />

            <Route exact path='/admins/ViewCases' component={ViewCases} />

            <Route exact path='/investors/Faqs' component={Faqs} />

            <Route exact path='/companies/Ejournals' component={Ejournals} />

            <Route exact path='/investors/Register' component={Register} />

          </div>
        </div>
      </Router>
    )
  }
}

export default App
