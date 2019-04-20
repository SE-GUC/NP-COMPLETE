import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Logout = (props) => {
  return (
    <Link to='/'>
      <Button onClick={
        props.logout
      }>
          Log out!
      </Button>
    </Link>
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
