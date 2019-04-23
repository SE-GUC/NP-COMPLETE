import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'


export class AdminRegisterUsers extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          users:[],
          adminID:localStorage.getItem('id')
        }
      }
      approveMe =id =>{
           console.log(id)
            Axios
            .delete(`/registerUsers/${this.state.adminID}/${id}`)
            .then(res =>{
             this.setState({users:res.data.remaining})}) 
            .catch(err => this.setState({error:true}))
      }

    componentDidMount() {
        this._isMounted = true
        this.setState({loading: true})
        Axios
        .get(`/api/admins/showUnapproved/${this.state.adminID}`)
        .then(res => this.setState({ users: res.data.data , loading: false }))
        .catch(err => this.setState({ error: true }))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
      {/*<DeleteAccounts users = {this.state.users} approveMe = {this.approveMe} /> */}
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <div className='App'>
    <Spinner animation="border" variant= "primary" /></div>
    :
    ( <div className='Investor'>
        <DeleteAccounts users = {this.state.users} approve={true} approveMe = {this.approveMe} /> 
      </div>
    )
  }
}

AdminRegisterUsers.propTypes = {
users: PropTypes.array
}

export default AdminRegisterUsers
