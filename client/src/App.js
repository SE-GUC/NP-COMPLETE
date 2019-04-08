import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/generic/Header'
import ViewForm from './pages/investorPages/ViewRejectedForms'
import Tracker from './pages/investorPages/Tracker'
import ViewCases from './pages/ViewCases'
import Faqs from './pages/investorPages/Faqs'
import Ejournals from './pages/CompaniesEjournals'
import Login from './pages/LoginPage'
import AddComment from './pages/AddComment'
import Register from './pages/investorPages/Register'
import acceptOrReject from './pages/acceptOrReject'
import AdminViewCases from './pages/AdminViewCases'
// import AdminViewCases from './pages/AdminViewCases'
// import AdminViewCases from './pages/AdminViewCases'
import './App.css'
import Admin from './pages/Admin'
import Investor from './pages/Investor'
import Lawyer from './pages/Lawyer'
import Reviewer from './pages/Reviewer'

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

            <Route exact path='/LogIn' component={Login} />

            <Route exact path='/reviewers/acceptOrReject/:reviewerId/:companyId' component={acceptOrReject} />

            <Route exact path='/lawyers/addComment/:lawyerId/:companyId' component={AddComment} />

            <Route exact path='/investors/Register' component={Register} />

            <Route exact path='/admins/deleteInvestor' component={Investor} />

            <Route exact path='/admins/deleteAdmin' component={Admin} />

            <Route exact path='/admins/deleteReviewer' component={Reviewer} />

            <Route exact path='/admins/deleteLawyer' component={Lawyer} />

            <Route exact path='/admins/viewAllCases/:id' component={AdminViewCases} />

            {/* <Route exact path='/lawyers/viewAllCases' component={LawyerViewCases} />             */}

            {/* <Route exact path='/reviewers/viewAllCases' component={ReviewerViewCases} /> */}

          </div>
        </div>

      </Router>
    )
  }
}

export default App
