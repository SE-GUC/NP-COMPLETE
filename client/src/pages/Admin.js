import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import {Spinner , Alert} from 'react-bootstrap'

export class Admin extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading:true,
          error: false,
          users:[]
        }
      }
      deleteMe =id =>{
        this.setState({loading: true , error: false})
            Axios
            .delete(`/api/admins/${id}`)
            .then(alert('You deleted the user with id : ' + id))
            .then(res =>{
             this.setState({users:res.data.remaining , loading:false})}) 
            .catch(err => this.setState({error:true , loading: false}))
      }

    componentDidMount() {
        this._isMounted = true
        this.setState({loading: true , error: false})
        Axios
        .get('/api/admins')
        .then(res => this.setState({ users: res.data.data , loading:false }))
        .catch(err => this.setState({ error: true , loading: false}))
    }

    componentWillUnmount() {
      this._isMounted = false
    }

  render() {
    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:this.state.loading?
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    : 
    ( <div className='Admin'>
        <DeleteAccounts users = {this.state.users} deleteMe = {this.deleteMe} />
      </div>
    )
  }
}

export default Admin
