import React, { Component } from 'react'
import axios from 'axios'
import Apps from '../../components/company/Apps'
import Header2 from '../../components/Header2'
import {Spinner , Alert} from 'react-bootstrap'

export class CancelApplication extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      errorMessage: null,
      apps: [],
      error: false
    }
  }

  componentDidMount () {
    const  investorId  = localStorage.getItem('id')
    this.setState({loading: true , error: false})
     axios
      .get('/api/companies/')
      .then(
        res => {
          const resultArr = res.data.data
          const applications = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            if (resultArr[i].investorId === investorId && resultArr[i].form.acceptedByReviewer === -1) { 
                applications.push(resultArr[i]) 
            }
          }
          this.setState({ apps: applications, loading: false })
        }
      )
      .catch(error => {
        if (error['response']) {
          console.log(error['response'].data)
          this.setState({ error: true, loading: false, errorMessage: error['response'].data.message })
        } else {
          console.log(error)
          this.setState({error: true , loading: false})
        }
      })
  }

  render () {
    if (this.state.loading === false && this.state.apps.length === 0) {
        return (
          
         <Alert className='App' variant='danger'>You don't have any unreviewed applications</Alert>
        )
      }
      if (this.state.loading === false && this.state.error) {
        return (
          <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>
        )
      }

    return (
      <div className='App'>
        <div>
          {this.state.loading ? <div className='App'><Spinner animation="border" variant= "primary" /></div>
            : <div> <Header2 title='Cancel an Application' /> 
            <Apps forms={this.state.apps} cancel={this.cancel} /> </div>}
        </div>
      </div>

    )
  }

    cancel =  (id) => {
    console.log(id)
    const investorId = this.props.match.params
    console.log(investorId)
    axios
      .delete('/api/companies/'+ id)
      .then( res => {
          this.setState({apps: [...this.state.apps.filter(app => app._id !== id )]})
      })
          
      .catch(error => {
        if (error['response']) {
          console.log(error['response'].data)
          this.setState({ error: true, loading: false, errorMessage: error['response'].data.message })
        } else {
          console.log(error)
        }
      })
}
}

export default CancelApplication
