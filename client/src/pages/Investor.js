import React, { Component } from 'react'
import Axios from 'axios'
import DeleteAccounts from '../components/DeleteAccounts'
import PropTypes from 'prop-types'
import {Spinner , Alert} from 'react-bootstrap'
import {Header} from 'semantic-ui-react'


export class Investor extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state={
          loading: true,
          error: false,
          users:[]
        }
      }
      deleteMe =id =>{
        this.setState({loading: true})
            Axios
            .delete(`/api/investors/${id}`)
            .then(alert('You deleted the user with id : ' + id))
            .then(res =>{
             this.setState({users:res.data.remaining , loading :false})}) 
            .catch(err => this.setState({error:true , loading: false}))
      }

    componentDidMount() {
        this._isMounted = true
        this.setState({loading: true})
        Axios
        .get('/api/investors')
        .then(res => this.setState({ users: res.data.data , loading: false }))
        .catch(err => this.setState({ error: true , loading: false}))
    }

    componentWillUnmount() {
        this._isMounted = false
      }
  render() {
    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>:
    (this.state.loading?
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    :
    ( <div className='Investor'>
      <Header inverted centered as='h1'>Delete an Investor Account</Header>
        <DeleteAccounts users = {this.state.users} deleteMe = {this.deleteMe} />
      </div>
    )
    )
  }
}

Investor.propTypes = {
users: PropTypes.array
}

export default Investor
