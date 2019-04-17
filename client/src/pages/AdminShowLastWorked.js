import React, { Component } from 'react'
import { Alert, Card } from 'react-bootstrap'
import axios from 'axios'

class AdminShowLastWorked extends Component {
  constructor (props) {
    super(props)
    const id = localStorage.getItem('id')
    this.state = {
      response: undefined,
      adminId: id,
      companyId: '',
      idEntered: false
    }
  }
  componentDidMount () {
    if (this.state.idEntered) {
      axios.get(`/api/admins/showLastWorked/${this.state.companyId}/${this.state.adminId}`)
        .then(res => { this.setState({ response: res.data }) })
        .catch(err => {
          if (err.response && err.response.data) {
            this.setState({ response: err.response.data })
          } else {
            console.log(err)
          }
        })
    }
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
          !this.state.idEntered
            ? <div>
              <label>Company ID</label>
              <input
                type='text'
                value={this.state.companyId}
                onChange={(e) => { this.setState({ companyId: e.target.value }) }}
              />
              <button onClick={() => { this.setState({ idEntered: true }) }}>search</button>
            </div>
            : this.state.response && this.state.response.data
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

export default AdminShowLastWorked
