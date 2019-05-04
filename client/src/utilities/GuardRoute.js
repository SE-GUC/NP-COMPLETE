import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/authActions'
import { addFlashMessage } from '../actions/flashMessageActions'

export default function (ComposedComponent, type) {

  class GuardRoute extends React.Component {
    componentWillMount () {
      var matches = true
      if (type !== undefined && type !== null && this.props.loggedUser !== undefined) {
        if (type === 'InternalPortal' && (this.props.loggedUser.type !== 'Lawyer' && this.props.loggedUser.type !== 'Reviewer' && this.props.loggedUser.type !== 'Admin')) {
          matches = false
        } else if (type !== this.props.loggedUser.type) {
          matches = false
        }
      }

      if (!this.props.isLoggedIn) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.props.history.push('/login')
      }
      // else if (this.props.isLoggedIn && !matches) {
      //   this.props.addFlashMessage({
      //     type: 'error',
      //     text: 'Unathorized Action'
      //   })
      //   this.props.history.push('/unauth')
      // }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.isLoggedIn) {
        this.props.history.push('/')
      }
    }

    render () {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  GuardRoute.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    loggedUser: state.auth.loggedUser
  })
  // return connect(mapStateToProps)(Authenticate)
  return connect(mapStateToProps, { addFlashMessage, login })(GuardRoute)
}
