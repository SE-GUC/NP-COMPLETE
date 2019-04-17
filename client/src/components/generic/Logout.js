// import React, { Component } from 'react'
// import {Button} from 'reactstrap'
// import { connect } from 'react-redux'
// import { logout } from '../../actions/authActions'
// import PropTypes from 'prop-types'

// class Logout extends Component {

// logout = (e) => {
//   this.props.logout()
// }

//   render () {
//     return (
//       <Button onClick={this.logout}>Log out!</Button>
//     )
//   }
// }

// Logout.propTypes = {
//   logout: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//   isLoggedIn: state.auth.isLoggedIn,
//   loggedUser: state.auth.loggedUser
// })
// export default connect(mapStateToProps, { logout })(Logout)

import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import PropTypes from 'prop-types'

const Logout = (props) => {
  return (
    <Button onClick={props.logout}>
        Log out!
    </Button>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loggedUser: state.auth.loggedUser
})
export default connect(mapStateToProps, { logout })(Logout)
