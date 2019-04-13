import React, { Component } from 'react'
import CompaniesPage from '../../components/company/CompaniesPage'
import axios from 'axios'


class Tracker extends Component {
  _isMounted = false // effect of delay to wait for data from server and don't return undefined
  state = {
    companies:[
 
  ]
}
  
 componentDidMount() {
    const {id} = this.props.match.params
    this._isMounted = true
    axios
    .get('/api/investors/getCompanies/' + id)
    .then(res => {
      const data = res.data.data
      this.setState({companies:data })
      })
    .catch(err => this.setState({error:true}))
  } 
 
  componentWillUnmount() {
    this._isMounted = false
  }
  

  render() {
    return (
      <div className="Tracker">
          <CompaniesPage companies = {this.state.companies} />
      </div>
    )

  }
}

export default Tracker;
