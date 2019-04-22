import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/authActions'
import { addFlashMessage } from '../actions/flashMessageActions'

export default function (ComposedComponent) {
  class GuardRoute extends React.Component {
    componentWillMount () {
      console.log(this.props)
      if (!this.props.isLoggedIn) {
        // this.props.addFlashMessage({
        //   type: 'error',
        //   text: 'You need to login to access this page'
        // })
        this.props.history.push('/login')
      }
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
