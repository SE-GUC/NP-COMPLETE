import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapCases from '../components/MapCases'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import SearchCases from '../components/SearchCases';

export class AdminViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          cases:[],
          searchedCases:[],
          ID:[],
          loading:true
        }
      }
      handleInputChange = evt => {
        this.setState({ ID: evt.target.value })
        this.Search()
    }
    Search=()=> {
      if(this.state.ID!=='')
          this.setState( 
            { searchedCases:[...this.state.cases.filter((current)=> current._id.includes(this.state.ID))]
            })
       else {
        this.setState( 
          { searchedCases:[...this.state.cases.filter((current)=> current._id.includes("????"))]
          })
       }     
    }
    componentDidMount() {
        this._isMounted = true
        const id = localStorage.getItem('id')
        Axios.get('/api/admins/viewCases/'+ id)
        .then(res => this.setState({ cases: res.data.data,loading:false }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
    
  render() {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <div>
      <h1>Page Loading Please Be Patient</ h1>
    <Spinner animation="border" variant="primary" />
    </div>
    :
    ( 
      <div>
        <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>Sort by Establishment Date</Button>
        <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
        <br/><br/>
        <input
              type="text"
              onChange={this.handleInputChange}
            /> <Button variant='danger' onClick={this.Search}>Search</Button>
        
            <br/>
            <SearchCases cases = {this.state.searchedCases}/>
        <div>
        <MapCases cases = {this.state.cases}/>
        </div>
      </div>  
    )
  }
}

AdminViewCases.propTypes = {
cases: PropTypes.array
}

export default AdminViewCases
