import React, { Component } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import axios from 'axios'
import './ReviewerAddComment.css'
import queryString from 'query-string'

class ReviewerAddComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      response: undefined
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
          this.state.response
            ? <Alert key='1' id='panner' variant={this.state.response.status === 'Success' ? 'success' : 'danger'}>
              {this.state.response.status}: {this.state.response.message}
            </Alert>

            : <div>
              {/* <Form>
                <Form.Row id='IDs'>
                  <Col>
                    <Form.Control id='lawyerId' placeholder='Reveiwer ID' onChange={(event) => { this.RID = event.target.value }} />
                  </Col>
                  <Col>
                    <Form.Control id='companyId' placeholder='Company ID' onChange={(event) => { this.CID = event.target.value }} />
                  </Col>
                </Form.Row>
              </Form> */}

              <Form.Group id='comments' controlId='exampleForm.ControlTextarea1'>
                <Form.Label id='commLable'>Comments</Form.Label>
                <Form.Control id='commArea' as='textarea' rows='5' onChange={(event) => { this.comm = event.target.value }} />
              </Form.Group>

              <Button id='submit' as='input' type='submit' value='Submit'
                onClick={() => {
                  const values = queryString.parse(this.props.location.search)
                  const reviewerID = values.reviewerId
                  const companyID = values.companyId
                  const comment = this.comm
                  axios.put(`http://localhost:8000/api/reviewers/addComment/${reviewerID}/${companyID}`, { comment: comment })
                    .then(res => { this.setState({ response: res.data }) })
                    .catch(err => {
                      if (err.response && err.response.data) {
                        this.setState({ response: err.response.data })
                      } else {
                        console.log(err)
                      }
                    })
                }} />
            </div>
        }
        </body>
      </>
    )
  }
}

export default ReviewerAddComment
