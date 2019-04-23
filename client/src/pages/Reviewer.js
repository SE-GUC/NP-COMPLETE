import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'


export class Reviewer extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          users:[]
        }
      }
      deleteMe =id =>{
            Axios
            .delete(`/api/reviewers/${id}`)
            .then(res =>{
             this.setState({users:res.data.remaining})}) 
            .catch(err => this.setState({error:true}))
      }

    componentDidMount() {
        this._isMounted = true
        this.setState({loading: true})
        Axios
        .get('/api/reviewers')
        .then(res => this.setState({ users: res.data.data , loading: false }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    :
    ( <div className='Investor'>
        <DeleteAccounts users = {this.state.users} deleteMe = {this.deleteMe} />
      </div>
    )
  }
}

Reviewer.propTypes = {
users: PropTypes.array
}

export default Reviewer
