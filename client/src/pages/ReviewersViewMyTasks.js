import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import Spinner from 'react-bootstrap/Spinner'

export class ReviewersViewMyTasks extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          tasks:[]
        }
      }
    componentDidMount() {
        const id = localStorage.getItem('id')
        this._isMounted = true
        Axios.get('/api/reviewers/workPage/'+ id)
        .then(res => this.setState({ tasks: res.data.data }))
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
            <MapTasks tasks = {this.state.tasks}/>
          </div>
        )
  }
}


ReviewersViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default ReviewersViewMyTasks
