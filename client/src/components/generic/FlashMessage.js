import React from 'react'
import classnames from 'classnames'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { deleteFlashMessage } from '../../actions/flashMessageActions'

class FlashMessage extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.deleteFlashMessage()
  }

  render () {
    const { type, text } = this.props.message
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.onClick} className='close'><span>&times;</span></button>
        {text}
      </div>
    )
  }
}

// FlashMessage.propTypes = {
//   deleteFlashMessage: PropTypes.func.isRequired
// }

// export default connect(null, { deleteFlashMessage })(FlashMessage)
export default (FlashMessage)

// const FlashMessage2 = (props) => {
//   return (
//     <div className={classnames('alert', {
//       'alert-success': this.props.message.type === 'success',
//       'alert-danger': this.props.message.type === 'error'
//     })}>
//       <button
//         onClick={this.props.deleteFlashMessage(this.props.message.id)}
//         className='close'>
//         <span>&times;</span>
//       </button>
//       {this.props.message.text}
//     </div>
//   )
// }

// FlashMessage2.propTypes = {
//   message: React.PropTypes.object.isRequired,
//   deleteFlashMessage: React.PropTypes.func.isRequired
// }
