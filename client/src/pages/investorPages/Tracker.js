import React, { Component } from 'react'
import CompaniesPage from '../../components/company/CompaniesPage'
import axios from 'axios'


class Tracker extends Component {
  _isMounted = false // effect of delay to wait for data from server and don't return undefined
  state = {
    companies:[
    //{
      /*name: 'co1',
      id: '001',
      status: 'pending'*/
      //"form":{"data":[]},"_id":"5ca0b9b59af50a72a40cf0ba","name":"Nike","establishmentDate":"1837-02-15T00:00:00.000Z","type":"SSC","state":"established","accepted":true,"investorId":"5c9614f2fe51f5258ce36f91","__v":0
    //}
  ]
}
  
 componentDidMount() {
    const {id} = this.props.match.params
    this._isMounted = true
    axios
    .get('http://localhost:8000/api/investors/getCompanies/' + id)
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
          <CompaniesPage companies = {this.state.companies}
          
           /*markComplete={this.markComplete}*/ />
      </div>
    )

  }
}

export default Tracker;
