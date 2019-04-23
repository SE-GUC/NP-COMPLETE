import './App.css'
import Admin from './pages/Admin'
import Lawyer from './pages/Lawyer'
import LogIn from './pages/loginPages/LogIn'
import Investor from './pages/Investor'
import Reviewer from './pages/Reviewer'
import React, { Component } from 'react'
import Faqs from './pages/investorPages/Faqs'
// import Header from './components/generic/Header'
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
import AdminLandingPage from './pages/adminPages/AdminLandingPage'
import InvestorLandingPage from './pages/investorPages/InvestorLandingPage'
import ReviewerShowLastWorked from './pages/ReviewerShowLastWorked'
import CancelApplication from './pages/investorPages/CancelApplication'
import acceptOrRejectInvestorForm from './pages/acceptOrRejectInvestorForm'
import AllMyCompanies from './pages/investorPages/AllMyCompanies'
import UpdateProfile from './pages/UpdateProfile'
import UpdateForm from './pages/UpdateForm'
import ChooseForm from './pages/investorPages/ChooseCompanyType'
import setAuthToken from './setAuthToken'
import publishCompany from './pages/PublishCompany'
import RegisterInternal from './pages/adminPages/RegisterInternal'
import CalcFees from './pages/lawyerPages/CalcFees'
import ReviewForm from './pages/ReviewForm'
// import { Container } from 'react-bootstrap'
// import NavBar from './components/generic/NavbarGafi'
import confirmation from './pages/Confrimation'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import DBRepop from './pages/DBRepop'
import AdminSendEmails from './pages/AdminSendEmails'
import HomepageLayout from './pages/HomePageLayout'
import WorkPage from './pages/Internalportal/WorkPage'
import { truncate } from 'fs'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
}

class App extends Component {
  render () {
    return (
      <React.Fragment>

        <Router>
          {/* <NavBar />
          <Header /> */}
          {/* <Container> */}

          <Route exact path='/' component={HomepageLayout} />

          <Route exact path='/login' component={LogIn} />

          <Route exact path='/internalportal/workpage' component={WorkPage} />

          <Route exact path='/admin' component={AdminLandingPage} />

          <Route exact path='/investor' component={InvestorLandingPage} />

          <Route exact path='/investors/Faqs' component={Faqs} />

          <Route exact path='/admins/deleteAdmin' component={Admin} />

          <Route exact path='/admins/deleteLawyer' component={Lawyer} />

          <Route exact path='/investors/Register' component={Register} />

          <Route exact path='/companies/Ejournals' component={Ejournals} />

          <Route exact path='/investors/tracker' component={Tracker} />

          <Route exact path='/admins/deleteInvestor' component={Investor} />

          <Route exact path='/admins/deleteReviewer' component={Reviewer} />

          <Route exact path='/investors/viewRejected' component={ViewForm} />

          <Route exact path='/admins/viewAllWalkInCases' component={() => <AdminViewCases walkIn />} />

          <Route exact path='/admins/viewAllPortalCases' component={() => <AdminViewCases walkIn={false} />} />

          <Route exact path='/admins/viewMyTasks' component={AdminsViewMyTasks} />

          <Route exact path='/lawyers/viewAllWalkInCases' component={() => <LawyerViewCases walkIn />} />

          <Route exact path='/lawyers/viewAllPortalCases' component={() => <LawyerViewCases walkIn={false} />} />

          <Route exact path='/admins/showLastWorked' component={AdminShowLastWorked} />

          <Route exact path='/lawyers/viewMyTasks' component={LawyersViewMyTasks} />

          <Route exact path='/lawyers/showLastWorked' component={LawyerShowLastWorked} />

          <Route exact path='/reviewers/viewAllWalkInCases' component={() => <ReviewerViewCases walkIn />} />

          <Route exact path='/reviewers/viewAllPortalCases' component={() => <ReviewerViewCases walkIn={false} />} />

          <Route exact path='/reviewers/viewMyTasks' component={ReviewersViewMyTasks} />

          {/* <Route exact path='/investors/payFees/:investorId/:companyId' component={payFees} /> */}

          <Route exact path='/investors/MyCompanies' component={AllMyCompanies} />

          <Route exact path='/reviewers/showLastWorked' component={ReviewerShowLastWorked} />

          <Route exact path='/lawyers/addComment' component={LawyerAddComment} />

          <Route exact path='/investors/cancelApplication' component={CancelApplication} />

          <Route exact path='/reviewers/addComment' component={ReviewerAddComment} />

          <Route exact path='/reviewers/acceptOrReject' component={acceptOrReject} />

          <Route exact path='/lawyers/review' component={acceptOrRejectInvestorForm} />

          <Route exact path='/user/UpdateProfile' component={UpdateProfile} />

          <Route exact path='/investors/fillForm' component={ChooseForm} />

          <Route exact path='/investors/editForm' component={UpdateForm} />

          <Route exact path='/admins/publishCompany' component={publishCompany} />

          <Route exact path='/admins/registerInternal/' component={RegisterInternal} />

          <Route exact path='/lawyers/CalcFees' component={CalcFees} />

          <Route exact path='users/reviewForm' component={ReviewForm} />
          <Route exact path='/confirmation/:model/:emailToken' component={confirmation} />
          <Route exact path='/ForgetPassword' component={ForgetPassword} />
          <Route exact path='/ResetPassword/:model/:emailToken' component={ResetPassword} />

          <Route exact path='/admins/DBRepop' component={DBRepop} />
          <Route exact path='/admins/sendEmail' component={AdminSendEmails} />


          {/* </Container> */}
        </Router>
      </React.Fragment>
    )
  }
}

export default App
