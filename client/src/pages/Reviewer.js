import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'


export class Reviewer extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          users:[]
        }
      }
      deleteMe =id =>{
            Axios
            .delete(`/api/reviewers/${id}`)
            .then(res =>{
             this.setState({users:res.data.remainingReviewers})}) 
            .catch(err => this.setState({error:true}))
      }

    componentDidMount() {
        this._isMounted = true
        Axios
        .get('/api/reviewers')
        .then(res => this.setState({ users: res.data.data }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <h1>loading please be patient</h1>
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
