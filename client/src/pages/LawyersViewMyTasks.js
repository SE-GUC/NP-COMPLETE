import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import Spinner from 'react-bootstrap/Spinner'

export class LawyersViewMyTasks extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          tasks:[],
          loading:true
        }
      }
    componentDidMount() {
        this._isMounted = true
        const id = localStorage.getItem('id')
        Axios.get('/api/lawyers/workPage/'+ id)
        .then(res => this.setState({ tasks: res.data.data, loading: false }))
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


LawyersViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default LawyersViewMyTasks
