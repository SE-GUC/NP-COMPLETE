import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapCases from '../components/MapCases'
import {Spinner , Alert} from 'react-bootstrap'
import { Header, Button } from 'semantic-ui-react'

export class LawyerViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          cases:[],
          walkIn: props.walkIn,
          error: false
        }
      }

    componentDidMount() {
        const id = localStorage.getItem('id')
        this._isMounted = true
        this.setState({loading: true , error: false})
        Axios.get('/api/lawyers/casesPage/'+ id)
        .then(res => this.setState({ cases: res.data.data , loading: false}))
        .catch(err => this.setState({ error: true, loading: false }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    if (localStorage.getItem('language') === 'English') {
    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:this.state.loading?
    <div className='App'>
    <Spinner animation="border" variant="primary" />
    </div>
    :
    ( <div>
      {this.state.walkIn === true?
      <Header inverted centered as='h1'>Walk In Cases</Header>
      : <Header inverted centered as='h1'>Portal Cases</Header>}
      <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>Sort by Establishment Date</Button>
      <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
      <MapCases cases = {this.state.cases} walkIn={this.state.walkIn}/>
      </div>
    )
  } else{
    return this.state.error? <Alert className='App' variant='danger'>يبدو ان ثمة مشكلة الرجاء حاول مجددا</Alert>:
    (this.state.loading?
    <div className='App'><Spinner animation="border" variant="primary" /></div>
    :
    ( <div>
      {this.state.walkIn === true?
      <Header inverted centered as='h1'>Walk In Cases</Header>
      : <Header inverted centered as='h1'>Portal Cases</Header>}
      <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>>رتب بتاريخ التاسيس</Button>
      <Button onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>IDرتب بال</Button>
      <MapCases cases = {this.state.cases} walkIn={this.state.walkIn}/>
      </div>
    )
    )
  }
}
}

LawyerViewCases.propTypes = {
cases: PropTypes.array
}

export default LawyerViewCases
