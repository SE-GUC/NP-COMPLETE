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
import HomePageLayout from './pages/HomePageLayout'
import NewRegister from './pages/Register'
import { Segment } from 'semantic-ui-react'
import WorkPage from './pages/Internalportal/WorkPage'
import ContactUs from './components/ContactUs'
import FlashMessagesList from './components/generic/FlashMessagesList'
import GuardRoute from './utilities/GuardRoute'
import SettingsPage from './pages/SettingsPage'
import Money from './pages/investorPages/Money'
import Navbar from './components/generic/NavbarGafi'
import { NoMatch } from './pages/defaultPages/NoMatch'
import { UnAuth } from './pages/defaultPages/UnAuth'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
}

class App extends Component {
  render () {
    return (
      <React.Fragment >

        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em', top: '0', bottom: '0', left: '0', right: '0', position: 'absolute' }}
          vertical
        >

          <Router >
            <Navbar />
            <FlashMessagesList />

            <Route exact path='/' component={HomePageLayout} />

            <Route exact path='/newRegister' component={NewRegister} />

            <Route exact path='/login' component={LogIn} />

            <Route exact path='/internalportal/workpage' component={GuardRoute(WorkPage, 'InternalPortal')} />

            <Route exact path='/admin' component={GuardRoute(AdminLandingPage, 'Admin')} />

            <Route exact path='/investor' component={GuardRoute(InvestorLandingPage, 'Investor')} />

            <Route exact path='/investors/Faqs' component={Faqs} />

            <Route exact path='/admins/deleteAdmin' component={GuardRoute(Admin, 'Admin')} />

            <Route exact path='/admins/deleteLawyer' component={GuardRoute(Lawyer, 'Lawyer')} />

            <Route exact path='/investors/Register' component={Register} />

            <Route exact path='/companies/Ejournals' component={Ejournals} />

            <Route exact path='/investors/tracker' component={GuardRoute(Tracker, 'Investor')} />

            <Route exact path='/admins/deleteInvestor' component={GuardRoute(Investor, 'Admin')} />

            <Route exact path='/admins/deleteReviewer' component={GuardRoute(Reviewer, 'Reviewer')} />

            <Route exact path='/investors/viewRejected' component={GuardRoute(ViewForm, 'Investor')} />

            <Route exact path='/admins/viewAllWalkInCases' component={() => <AdminViewCases walkIn />} />

            <Route exact path='/admins/viewAllPortalCases' component={() => <AdminViewCases walkIn={false} />} />

            <Route exact path='/admins/viewMyTasks' component={GuardRoute(AdminsViewMyTasks, 'Admin')} />

            <Route exact path='/lawyers/viewAllWalkInCases' component={() => <LawyerViewCases walkIn />} />

            <Route exact path='/lawyers/viewAllPortalCases' component={() => <LawyerViewCases walkIn={false} />} />

            <Route exact path='/admins/showLastWorked' component={GuardRoute(AdminShowLastWorked, 'Admin')} />

            <Route exact path='/lawyers/viewMyTasks' component={GuardRoute(LawyersViewMyTasks, 'Lawyer')} />

            <Route exact path='/lawyers/showLastWorked' component={GuardRoute(LawyerShowLastWorked, 'Lawyer')} />

            <Route exact path='/investors/payFees' component={GuardRoute(Money, 'Investor')} />

            <Route exact path='/investors/MyCompanies' component={GuardRoute(AllMyCompanies, 'Investor')} />

            <Route exact path='/reviewers/viewAllWalkInCases' component={() => <ReviewerViewCases walkIn />} />

            <Route exact path='/reviewers/viewAllPortalCases' component={() => <ReviewerViewCases walkIn={false} />} />

            <Route exact path='/reviewers/viewMyTasks' component={GuardRoute(ReviewersViewMyTasks, 'Reviewer')} />

            {/* <Route exact path='/investors/payFees/:investorId/:companyId' component={payFees} /> */}

            <Route exact path='/investors/MyCompanies' component={GuardRoute(AllMyCompanies, 'Investor')} />

            <Route exact path='/reviewers/showLastWorked' component={GuardRoute(ReviewerShowLastWorked, 'Reviewer')} />

            <Route exact path='/lawyers/addComment' component={GuardRoute(LawyerAddComment, 'Lawyer')} />

            <Route exact path='/investors/cancelApplication' component={GuardRoute(CancelApplication, 'Investor')} />

            <Route exact path='/reviewers/addComment' component={GuardRoute(ReviewerAddComment, 'Reviewer')} />

            <Route exact path='/reviewers/acceptOrReject' component={GuardRoute(acceptOrReject)} />

            <Route exact path='/lawyers/review' component={GuardRoute(acceptOrRejectInvestorForm, 'Lawyer')} />

            <Route exact path='/user/UpdateProfile' component={GuardRoute(UpdateProfile)} />

            <Route exact path='/investors/fillForm' component={GuardRoute(ChooseForm)} />

            <Route exact path='/lawyers/fillForm' component={GuardRoute(ChooseForm)} />

            <Route exact path='/investors/editForm' component={GuardRoute(UpdateForm)} />

            <Route exact path='/lawyers/editForm' component={GuardRoute(UpdateForm)} />

            <Route exact path='/admins/publishCompany' component={GuardRoute(publishCompany)} />

            <Route exact path='/admins/registerInternal/' component={GuardRoute(RegisterInternal)} />

            <Route exact path='/lawyers/CalcFees' component={GuardRoute(CalcFees, 'Lawyer')} />

            <Route exact path='users/reviewForm' component={GuardRoute(ReviewForm)} />
            {/* users? */}

            <Route exact path='/confirmation/:model/:emailToken' component={confirmation} />

            <Route exact path='/ForgetPassword' component={ForgetPassword} />

            <Route exact path='/ResetPassword/:model/:emailToken' component={ResetPassword} />

            <Route exact path='/admins/DBRepop' component={DBRepop} />

            <Route exact path='/admins/sendEmail' component={GuardRoute(AdminSendEmails, 'Admin')} />

            <Route exact path='/admins/ContactUs' component={ContactUs} />

            <Route exact path='/user/settings' component={GuardRoute(SettingsPage)} />

            <Route exact path='/unauth' component={UnAuth} />

            <Route component={NoMatch} />
            {/* users? */}

            {/* </Container> */}
          </Router>
        </Segment>
      </React.Fragment>
    )
  }
}

export default App
