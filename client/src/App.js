import './App.css'
import Admin from './pages/Admin'
import Lawyer from './pages/Lawyer'
import Login from './pages/LoginPage'
import Investor from './pages/Investor'
import Reviewer from './pages/Reviewer'
import React, { Component } from 'react'
import Faqs from './pages/investorPages/Faqs'
import Header from './components/generic/Header'
import Ejournals from './pages/CompaniesEjournals'
import Tracker from './pages/investorPages/Tracker'
import acceptOrReject from './pages/acceptOrReject'
import AdminViewCases from './pages/AdminViewCases'
import LawyerViewCases from './pages/LawyerViewCases'
import Register from './pages/investorPages/Register'
import LawyerAddComment from './pages/LawyerAddComment'
import ReviewerViewCases from './pages/ReviewerViewCases'
import AdminsViewMyTasks from './pages/AdminsViewMyTasks'
import LawyersViewMyTasks from './pages/LawyersViewMyTasks'
import ReviewerAddComment from './pages/ReviewerAddComment'
import AdminShowLastWorked from './pages/AdminShowLastWorked'
import ViewForm from './pages/investorPages/ViewRejectedForms'
import LawyerShowLastWorked from './pages/LawyerShowLastWorked'
import ReviewersViewMyTasks from './pages/ReviewersViewMyTasks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReviewerShowLastWorked from './pages/ReviewerShowLastWorked'
import CancelApplication from './pages/investorPages/CancelApplication'
import acceptOrRejectInvestorForm from './pages/acceptOrRejectInvestorForm'
import AllMyCompanies from './pages/investorPages/AllMyCompanies'
import UpdateProfile from './pages/UpdateProfile'
import UpdateForm from './pages/UpdateForm'
import ChooseForm from './pages/investorPages/ChooseCompanyType'
import publishCompany from './pages/PublishCompany'
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

            <Route exact path='/LogIn' component={Login} />

            <Route exact path='/investors/Faqs' component={Faqs} />

            <Route exact path='/admins/deleteAdmin' component={Admin} />

            <Route exact path='/admins/deleteLawyer' component={Lawyer} />

            <Route exact path='/admins/ViewCases' component={AdminViewCases} />

            <Route exact path='/investors/Register' component={Register} />

            {/* <Route exact path='/investors/login' component={InvestorLogin} /> */}

            <Route exact path='/companies/Ejournals' component={Ejournals} />

            <Route exact path='/investors/tracker/:id' component={Tracker} />

            <Route exact path='/admins/deleteInvestor' component={Investor} />

            <Route exact path='/admins/deleteReviewer' component={Reviewer} />

            <Route exact path='/investors/viewRejected/:id' component={ViewForm} />

            <Route exact path='/admins/viewAllCases/:id' component={AdminViewCases} />

            <Route exact path='/admins/viewMyTasks/:id' component={AdminsViewMyTasks} />

            <Route exact path='/lawyers/viewAllCases/:id' component={LawyerViewCases} />

            <Route exact path='/admins/showLastWorked/:companyId/:adminId' component={AdminShowLastWorked} />

            <Route exact path='/lawyers/viewMyTasks/:id' component={LawyersViewMyTasks} />

            <Route exact path='/lawyers/showLastWorked/:companyId/:lawyerId' component={LawyerShowLastWorked} />

            <Route exact path='/reviewers/viewAllCases/:id' component={ReviewerViewCases} />

            <Route exact path='/reviewers/viewMyTasks/:id' component={ReviewersViewMyTasks} />

            {/* <Route exact path='/investors/payFees/:investorId/:companyId' component={payFees} /> */}

            <Route exact path='/investors/MyCompanies/:id' component={AllMyCompanies} />

            <Route exact path='/reviewers/showLastWorked/:companyId/:reviewerId' component={ReviewerShowLastWorked} />

            <Route exact path='/lawyers/addComment/:lawyerId/:companyId' component={LawyerAddComment} />

            <Route exact path='/investors/cancelApplication/:investorId' component={CancelApplication} />

            <Route exact path='/reviewers/addComment/:lawyerId/:companyId' component={ReviewerAddComment} />

            <Route exact path='/reviewers/acceptOrReject/:reviewerId/:companyId' component={acceptOrReject} />

            <Route exact path='/lawyers/review/:lawyerId/:companyId' component={acceptOrRejectInvestorForm} />

            <Route exact path='/user/UpdateProfile' component={UpdateProfile} />

            <Route exact path='/investors/fillForm' component={ChooseForm} />

            <Route exact path='/investors/editForm' component={UpdateForm} />

            <Route exact path='/admins/publishCompany/:id' component={publishCompany} />

          </div>
        </div>

      </Router>
    )
  }
}

export default App
