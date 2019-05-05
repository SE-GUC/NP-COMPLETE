import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapCases from '../components/MapCases'
import {Spinner , Alert} from 'react-bootstrap'
import { Header, Button } from 'semantic-ui-react'
import SearchCases from '../components/SearchCases';

export class AdminViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          cases:[],
          searchedCases:[],
          ID:[],
          loading:true,
          walkIn: props.walkIn,
          error: false
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
        this.setState({loading: true , error: false})
        Axios.get('/api/admins/viewCases/'+ id)
        .then(res => this.setState({ cases: res.data.data,loading:false }))
        .catch(err => this.setState({ error: true , loading: false}))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
    
  render() {
    if (localStorage.getItem('language') === 'English') {
    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:this.state.loading?
    <div className='App'>
      <Spinner animation="border" variant= "primary" />
    </div>
    :
    ( 
      <div>
        {this.state.walkIn === true?
        <Header inverted centered as='h1'>Walk In Cases</Header>
        : <Header inverted centered as='h1'>Portal Cases</Header>}
        <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>Sort by Establishment Date</Button> {' '}
        <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
        <br/><br/>
        <input
              type="text"
              onChange={this.handleInputChange}
            /> <Button variant='danger' onClick={this.Search}>Search</Button>
        
            <br/>
            <SearchCases cases = {this.state.searchedCases}/>
        <div>
        <MapCases cases = {this.state.cases} walkIn={this.state.walkIn}/>
        </div>
      </div>  
    )
  }
  else{
    return this.state.error? <Alert className='App' variant='danger'>يبدو ان ثمة مشكلة الرجاء حاول مجددا</Alert>:this.state.loading?
    <div className='App'>
      <Spinner animation="border" variant= "primary" />
    </div>
    :
    ( 
      <div>
        {this.state.walkIn === true?
        <Header inverted centered as='h1'>Walk In Cases</Header>
        : <Header inverted centered as='h1'>Portal Cases</Header>}
        <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>رتب بتاريخ التاسيس</Button>{' '}
        <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>IDرتب بال</Button>
        <br/><br/>
        <input
              type="text"
              onChange={this.handleInputChange}
            /> <Button variant='danger' onClick={this.Search}>ابحث</Button>
            <br/>
            <SearchCases cases = {this.state.searchedCases}/>
        <div>
        <h1>if green then filled by an ivestor else filled by a lawyer</h1>
        <MapCases cases = {this.state.cases} walkIn={this.state.walkIn}/>
        </div>
      </div>  
    )
  }
}
}

AdminViewCases.propTypes = {
cases: PropTypes.array
}

export default AdminViewCases
