import React from 'react'
import FlashMessage from './FlashMessage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteFlashMessage } from '../../actions/flashMessageActions'

class FlashMessagesList extends React.Component {
  render () {
    if (this.props.messages) {
      const messages = this.props.messages.map(message =>
        <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
      )
      return (
        <div>{messages}</div>
      )
    }
    return <></>
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    messages: state.flash.messages
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList)
