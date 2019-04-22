import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import ReviewerMapCases from '../components/ReviewerMapCases'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export class ReviewerViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          cases:[],
          model: 'reviewer'
        }
      }

    componentDidMount() {
        const {id} = this.props.match.params
        this._isMounted = true
        Axios.get('/api/reviewers/casesPage/'+ id)
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
        <ReviewerMapCases cases = {this.state.cases}/>
      </div>
    )
  }
}

ReviewerViewCases.propTypes = {
cases: PropTypes.array
}

export default ReviewerViewCases
