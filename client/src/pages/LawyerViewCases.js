import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import LawyerMapCases from '../components/LawyerMapCases'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export class LawyerViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          cases:[],
          model: 'lawyer'
        }
      }

    componentDidMount() {
        const {id} = this.props.match.params
        this._isMounted = true
        Axios.get('/api/lawyers/casesPage/'+ id)
        .then(res => this.setState({ cases: res.data.data }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <div>
    <Spinner animation="border" variant="primary" />
    </div>
    :
    ( <div>
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a.establishmentDate > b.establishmentDate) ? 1 : ((b.establishmentDate > a.establishmentDate) ? -1 : 0))})}>Sort by Establishment Date</Button>
      <Button variant='danger' onClick={()=>this.setState({cases:this.state.cases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
      <LawyerMapCases cases = {this.state.cases}/>
      </div>
    )
  }
}

LawyerViewCases.propTypes = {
cases: PropTypes.array
}

export default LawyerViewCases
