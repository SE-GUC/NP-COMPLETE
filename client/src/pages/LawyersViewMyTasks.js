import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import { MapCases } from '../components/MapCases';
import {Spinner , Alert} from 'react-bootstrap/Spinner'

export class LawyersViewMyTasks extends Component {
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
        this._isMounted = true
        //const id = localStorage.getItem('id')
        this.setState({error: false , loading: true})
        Axios.get('/api/lawyers/allowedCompanies')
        // Axios.get('/api/lawyers/workPage/'+ id)
        // old url from buffer branch
        .then(res => this.setState({ tasks: res.data.data , loading: false }))
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
            <MapCases cases = {this.state.tasks}/>
          </div>
        )
  }
}


LawyersViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default LawyersViewMyTasks
