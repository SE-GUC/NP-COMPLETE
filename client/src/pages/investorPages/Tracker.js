import React, { Component } from 'react'
import CompaniesPage from '../../components/company/CompaniesPage'
import axios from 'axios'
import {Spinner , Alert} from 'react-bootstrap'


class Tracker extends Component {
  _isMounted = false // effect of delay to wait for data from server and don't return undefined
  state = {
    loading: true,
    error: false,
    companies:[
 
  ]
}
  
 componentDidMount() {
    const id = localStorage.getItem('id')
    this._isMounted = true
    this.setState({loading: true , error: false})
    axios
    .get('/api/investors/getCompanies/' + id)
    .then(res => {
      const data = res.data.data
      this.setState({companies:data , loading: false })
      })
    .catch(err => this.setState({error:true , loading: false}))
  } 
 
  componentWillUnmount() {
    this._isMounted = false
  }
  

  render() {
    return (
      this.state.error ?<Alert className='App' variant='danger'>Looks like something has gone wrong</Alert> : 
      ( this.state.loading?<div className='App'><Spinner animation="border" variant= "primary" /></div>: 
      <div className="Tracker">
          <CompaniesPage companies = {this.state.companies} />
      </div>
    )
    )

  }
}

export default Tracker;
