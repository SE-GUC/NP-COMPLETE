import React, { Component } from 'react'
import Axios from 'axios'
import { Alert, Spinner, Button } from 'react-bootstrap'
import PDFDoc from '../components/PDFDoc'
import { saveAs } from 'file-saver'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'
import fs from 'fs'
import store from '../store'

// export class DisplayDocument extends Component {
//   constructor (props) {
//     super(props)
//     this.state = { loaded: false }
//     const { lawyerId, companyId } = props.match.params

//     Axios.put(`/api/lawyers/generateDocs/${lawyerId}/${companyId}`)
//       .then(res => { this.setState({ loaded: true }) })
//       .catch(err => { this.setState({ error: err }) })
//   }
//   render () {
//     return (
//       <>
//         <head>
//           <script src='https://unpkg.com/react/umd/react.production.js' crossorigin />

//           <script src='https://unpkg.com/react-dom/umd/react-dom.production.js' crossorigin />

//           <script src='https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js' crossorigin />

//           <script>var Alert = ReactBootstrap.Alert;</script>

//           <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
//             integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
//             crossorigin='anonymous'
//           />
//         </head>

//         <body>{
//           this.state.error
//             ? <Alert key='err' variant='danger'>{this.state.error.response.data.message}</Alert>
//             : this.state.loaded
//               ? <PDFDoc companyId={this.props.match.params.companyId} />
//               : <Spinner animation='border' variant='primary' />
//         }</body>
//       </>
//     )
//   }
// }

class DisplayDocument extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      isLoading: false
    }
  }

  handleClick () {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest(this).then(() => {
        this.setState({ isLoading: false })
      })
    })
  }

  render () {
    const { isLoading, error } = this.state

    return (
      error
        ? <Alert key='err' variant='danger'>{this.state.error.response.data.message}</Alert>
        : <Button
          variant='primary'
          disabled={isLoading}
          onClick={!isLoading ? this.handleClick : null}
        >
          {isLoading ? 'generating…' : 'Generate PDF document'}
        </Button>
    )
  }
}

const simulateNetworkRequest = (obj) => {
  const { lawyerId, companyId } = obj.props.match.params
  return Axios.put(`/api/lawyers/generateDocs/${lawyerId}/${companyId}`)
    .catch(err => { obj.setState({ error: err }) })
}

export default DisplayDocument
