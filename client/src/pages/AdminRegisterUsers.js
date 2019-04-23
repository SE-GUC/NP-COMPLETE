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
          adminID: "5cbe562af1b7c49dbcf32462",//localStorage.getItem('id'),
          workingHours:"",
          salary:""
        }
      }
      handleSalary=(e)=>{
        console.log(e.target.value)
        this.setState({salary:e.target.value})
      }
      handleWorkingHours=(e)=>{
        console.log(e.target.value)
        
        this.setState({workingHours:e.target.value})
      }
      approveMe =id =>{
           console.log(id)
           console.log(this.state.adminID)
           const data={
            acceptedByAdmin:true,
            salary: parseInt(this.state.salary),
            workingHours: parseInt(this.state.workingHours)
           }
            Axios
            .put(`/api/admins/registerUsers/${this.state.adminID}/${id}`,data)
            .then(res =>{
             this.setState({users:this.state.users.filter((user)=>user._id===id)})}) 
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
        <DeleteAccounts users = {this.state.users} approve={true} handleSalary={this.handleSalary} handleWorkingHours={this.handleWorkingHours} approveMe = {this.approveMe} /> 
      </div>
    )
  }
}

AdminRegisterUsers.propTypes = {
users: PropTypes.array
}

export default AdminRegisterUsers
