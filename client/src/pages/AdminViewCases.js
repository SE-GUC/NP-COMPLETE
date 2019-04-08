import React, { Component } from 'react'
import Axios from 'axios'
import PropTypes from 'prop-types'
import MapCases from '../components/MapCases'


export class AdminViewCases extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          cases:[]
        }
      }

    componentDidMount() {
        const {id} = this.props.match.params
        this._isMounted = true
        Axios.get('http://localhost:8000/api/admins/viewCases/'+ id)
        .then(res => this.setState({ cases: res.data.data }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <h1>loading please be patient</h1>
    :
    ( <div>
        <MapCases cases = {this.state.cases}/>
      </div>
    )
  }
}

AdminViewCases.propTypes = {
cases: PropTypes.array
}

export default AdminViewCases
