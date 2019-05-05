/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'
import {Spinner , Alert} from 'react-bootstrap'
import { resolve } from 'dns';
import {Header} from 'semantic-ui-react'

export class Lawyer extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          error: false,
          users:[],
          ready:false
        }
      }
      deleteMe =id =>{
            this.setState({loading: true , error: false})
            Axios
            .delete(`/api/lawyers/${id}`)
            .then(alert('You deleted the user with id : ' + id))
            .then(res =>{
             this.setState({users:res.data.remaining , loading: false})}) 
            .catch(err => this.setState({error:true , loading : false}))
      }

   async componentDidMount() {
      try{
        this._isMounted = true;
        console.log('before get')
        await this.setState({loading: true , error: false})
        const res = await Axios.get('/api/lawyers')
        await this.setState({ users: res.data.data , loading: false})
        console.log('after get ' + this.state.users)
        await this.setState({ready:true})
        
        //() => new Promise(resolve => setTimeout(resolve,10000))
      }
        catch(err){
         this.setState({ error: true , loading: false })
        }
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {

    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:this.state.loading?
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    :
    !this.state.ready?
    
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    :

    ( <div className='Lawyer'>
          {console.log("data:" + this.state.users)}
          <Header inverted centered as='h1'>Delete a Lawyer Account</Header>
        <DeleteAccounts users = {this.state.users} deleteMe = {this.deleteMe} />
      </div>
    )
  }
}

Lawyer.propTypes = {
users: PropTypes.array
}

export default Lawyer
