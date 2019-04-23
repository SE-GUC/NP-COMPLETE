import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import Spinner from 'react-bootstrap/Spinner'

import { MapCases } from '../components/MapCases';

export class ReviewersViewMyTasks extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true ,
          tasks:[]
        }
      }
    componentDidMount() {
        // const id = localStorage.getItem('id')
        this._isMounted = true
        this.setState({loading: true})
        Axios.get('/api/reviewers/allowedCompanies')
        .then(res => this.setState({ tasks: res.data.data, loading: false }))
        .catch(err => this.setState({ error: true , loading: false}))
    }

    componentWillUnmount() {
        this._isMounted = false
    }  
    render() {
        return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
        <div className='App'>
        <Spinner animation="border" variant="primary" />
        </div>
        :
        ( <div>
            <MapCases cases = {this.state.tasks}/>
          </div>
        )
  }
}


ReviewersViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default ReviewersViewMyTasks
