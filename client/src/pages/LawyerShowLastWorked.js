import React, { Component } from 'react'
import { Alert, Card } from 'react-bootstrap'
import axios from 'axios'

class LawyerShowLastWorked extends Component {
  constructor (props) {
    super(props)
    const lawyerId = this.props.match.params.lawyerId
    const companyId = this.props.match.params.companyId
    this.state = {
      response: undefined
    }
    axios.get(`http://localhost:8000/api/lawyers/showLastWorked/${companyId}/${lawyerId}`)
      .then(res => { this.setState({ response: res.data }) })
      .catch(err => {
        if (err.response && err.response.data) {
          this.setState({ response: err.response.data })
        } else {
          console.log(err)
        }
      })
  }

  render () {
    return (
      <>
        <head>
          <script src='https://unpkg.com/react/umd/react.production.js' crossorigin />

          <script src='https://unpkg.com/react-dom/umd/react-dom.production.js' crossorigin />

          <script src='https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js' crossorigin />

          <script>var Alert = ReactBootstrap.Alert;</script>

          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
            crossorigin='anonymous'
          />
        </head>

        <body> {
          this.state.response && this.state.response.data
            ? !this.state.response.data[0]
              ? <Alert key='1' variant='warning'>
                No one has worked on this form yet
              </Alert>

              : <div> {
                this.state.response.data.map(res =>
                  <Card bg='dark' border='warning' text='white'>
                    <Card.Text>{res}</Card.Text>
                  </Card>
                )
              }
              </div>

            : this.state.response && this.state.response.status === 'Error'
              ? <Alert key='2' variant='danger'>
                {this.state.response.message}
              </Alert>

              : <></>
        }
        </body>
      </>
    )
  }
}

export default LawyerShowLastWorked
