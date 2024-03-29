import React, { Component } from 'react'
import { Alert, Card ,Spinner } from 'react-bootstrap'
import axios from 'axios'
import ShowCompanies from '../components/fees/ShowCompanies'

class AdminShowLastWorked extends Component {
  constructor (props) {
    super(props)
    const id = localStorage.getItem('id')
    this.state = {
      response: undefined,
      adminId: id,
      companyId: '',
      idEntered: false,
      loading: true,
      error: false,
      allForms: []
    }
  }
  componentDidMount () {
    if (this.state.idEntered) {
      this.setState({error: false , loading: true})
      axios.get(`/api/admins/showLastWorked/${this.state.companyId}/${this.state.adminId}`)
        .then(res => { this.setState({ response: res.data, loading: false }) })
        .catch(err => {
          if (err.response && err.response.data) {
            this.setState({ response: err.response.data , error: true ,loading: false })
          } else {
            console.log(err)
            this.setState({error: true , loading: false})
          }
        })
    } else {
      axios.get('/api/companies/')
        .then(res => {
          this.setState({ allForms: res.data.data, loading: false })
          this.componentDidMount()
        })
        .catch(err => {
          if (err.response && err.response.data) {
            this.setState({ response: err.response.data , error: true ,loading: false })
          } else {
            console.log(err)
            this.setState({error: true , loading: false})
          }
        })
    }
  }
  chooseForm = (id,F) =>{ //dont remove the F
    this.setState({ companyId: id, idEntered: true, loading: true })
  }
  render () {
    if (localStorage.getItem('language') === 'English') {
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
          this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert> :
          this.state.loading ? <div className='App'><Spinner animation='border' variant='primary' /></div>
          : (
            !this.state.idEntered
              ? <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm} />
              : this.state.response && this.state.response.data
                ? !this.state.response.data[0]
                  ? <Alert className='App' key='1' variant='warning'>
                  No one has worked on this form yet
                  </Alert>

                  : <div> {
                    this.state.response.data.map(res =>
                      <Card bg='dark' border='warning' text='white'>
                        <Card.Header>{res}</Card.Header>
                      </Card>
                    )
                  }
                  </div>

                : this.state.response && this.state.response.status === 'Error'
                  ? <Alert className='App' key='2' variant='danger'>
                    {this.state.response.message}
                  </Alert>

                  : <></>
          )
        }
        </body>
      </>
      )
    } else {
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
          this.state.error? <Alert className='App' variant='danger'>يبدو ان ثمة مشكلة الرجاء حاول مجددا</Alert> :
          this.state.loading ? <div className='App'><Spinner animation='border' variant='primary' /></div>
            : (
              this.state.response && this.state.response.data
                ? !this.state.response.data[0]
                  ? <Alert className='App' key='1' variant='warning'>
                لم يعمل احد علي هذه الاستماره الي الان
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
                  ? <Alert className='App' key='2' variant='danger'>
                    {this.state.response.message}
                  </Alert>

                  : <></>
            )
        }
        </body>
      </>
      )
    }
  }
}

export default AdminShowLastWorked
