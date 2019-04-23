import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapCases from '../components/MapCases'
import {Spinner , Alert} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export class LawyerViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          error: false,
          cases:[]
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
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>Sort by Establishment Date</Button>
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
      <h1>if green then filled by an ivestor else filled by a lawyer</h1>
      <MapCases cases = {this.state.cases}/>
      </div>
    )
  } else{
    return this.state.error? <Alert className='App' variant='danger'>يبدو ان ثمة مشكلة الرجاء حاول مجددا</Alert>:
    (this.state.loading?
    <div className='App'><Spinner animation="border" variant="primary" /></div>
    :
    ( <div>
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>>رتب بتاريخ التاسيس</Button>
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>IDرتب بال</Button>
      <h1>if green then filled by an ivestor else filled by a lawyer</h1>
      <MapCases cases = {this.state.cases}/>
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
