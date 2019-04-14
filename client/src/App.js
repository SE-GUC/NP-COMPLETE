import './App.css'
import Admin from './pages/Admin'
import Lawyer from './pages/Lawyer'
import Login from './pages/LoginPage'
import Investor from './pages/Investor'
import Reviewer from './pages/Reviewer'
import React, { Component } from 'react'
import ViewCases from './pages/ViewCases'
import AddComment from './pages/AddComment'
import Faqs from './pages/investorPages/Faqs'
import Header from './components/generic/Header'
import Ejournals from './pages/CompaniesEjournals'
import Tracker from './pages/investorPages/Tracker'
import acceptOrReject from './pages/acceptOrReject'
import AdminViewCases from './pages/AdminViewCases'
import LawyerViewCases from './pages/LawyerViewCases'
import Register from './pages/investorPages/Register'
import ReviewerViewCases from './pages/ReviewerViewCases'
import AdminsViewMyTasks from './pages/AdminsViewMyTasks'
import LawyersViewMyTasks from './pages/LawyersViewMyTasks'
import ViewForm from './pages/investorPages/ViewRejectedForms'
import ReviewersViewMyTasks from './pages/ReviewersViewMyTasks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AdminLandingPage from './pages/adminPages/AdminLandingPage'
import InvestorLandingPage from './pages/investorPages/InvestorLandingPage'

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
          </div>
        </div>

      </Router>
    )
  }
}

export default App
