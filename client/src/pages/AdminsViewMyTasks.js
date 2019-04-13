import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapTasks from '../components/MapTasks'
import Spinner from 'react-bootstrap/Spinner'

export class AdminsViewMyTasks extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          tasks:[]
        }
      }
    componentDidMount() {
        const {id} = this.props.match.params
        this._isMounted = true
        Axios.get('https://gafi-web.herokuapp.com/api/admins/workPage/'+ id)
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


AdminsViewMyTasks.propTypes = {
    tasks: PropTypes.array
    }

export default AdminsViewMyTasks
