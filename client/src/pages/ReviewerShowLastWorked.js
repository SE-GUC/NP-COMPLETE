import React, { Component } from 'react'
import { Alert, Card } from 'react-bootstrap'
import axios from 'axios'
import ShowCompanies from '../components/fees/ShowCompanies';

class ReviewerShowLastWorked extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lawyerId: localStorage.getItem('id'),
      response: undefined,
      companyId: '',
      idEntered: false,
      loading: true,
      allForms: []
    }
  }
  componentDidMount () {
    if (this.state.idEntered) {
      axios.get(`/api/reviewers/showLastWorked/${this.state.companyId}/${this.state.lawyerId}`)
        .then(res => { this.setState({ response: res.data, loading: false }) })
        .catch(err => {
          if (err.response && err.response.data) {
            this.setState({ response: err.response.data })
          } else {
            console.log(err)
            this.setState({ idEntered: false })
          }
        })
    }else {
      axios
      .get('/api/companies/')
      .then(res=>{
        return this.setState({ allForms: res.data.data, loading: false });
      })
    }

  }
  chooseForm = (id, F)=>{
    this.setState({companyId:id,idEntered:true})
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
            ? <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
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

export default ReviewerShowLastWorked
