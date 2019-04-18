import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../actions/authActions'
import store from '../store'

const InvestorPrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route {...rest} render={(props) => (
    // console.log(store.getState().auth.isLoggedIn)
    store.getState().auth.isLoggedIn === true
      ? (<Component {...props} />)
      // : props.history.pushState('/investors/login')
      : <Redirect to={{
        pathname: '/investors/login',
        state: { from: props.location }
      }} />
  )}
  />

)
InvestorPrivateRoute.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedUser: state.auth.loggedUser
})

export default connect(mapStateToProps, { logout })(InvestorPrivateRoute)
