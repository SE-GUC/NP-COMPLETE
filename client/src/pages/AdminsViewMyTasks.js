import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import {Spinner , Alert} from 'react-bootstrap'

export class AdminsViewMyTasks extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          error: false,
          tasks:[]
        }
      }
    componentDidMount() {
        const id = localStorage.getItem('id')
        this._isMounted = true
        this.setState({loading: true , error: false})
        Axios.get('/api/admins/workPage/'+ id)
        .then(res => this.setState({ tasks: res.data.data, loading: false }))
        .catch(err => this.setState({ error: true, loading: false }))
    }

    componentWillUnmount() {
        this._isMounted = false
    }  
    render() {
        return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:this.state.loading?
        <div className='App'>
        <Spinner animation="border" variant="primary" />
        </div>
        :
        ( <div>
            <MapTasks tasks = {this.state.tasks}/>
          </div>
        )
  }
}


AdminsViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default AdminsViewMyTasks
