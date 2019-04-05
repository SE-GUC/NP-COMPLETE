import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DeleteAccounts from './components/DeleteAccounts'

class App extends Component {
  state = {data:[]}
  deleteMe =id =>{
  if(window.location.pathname==='/admins/'||window.location.pathname==='/admins'){
    axios
    .delete(`https://shrouded-basin-67688.herokuapp.com/api/admins/${id}`)
    .then(res =>{
     this.setState({data:res.data.remainingAdmins})}) 
    .catch(err => this.setState({error:true}))}
  if(window.location.pathname==='/investors/'||window.location.pathname==='/investors'){
      axios
      .delete(`https://shrouded-basin-67688.herokuapp.com/api/investors/${id}`)
      .then(res =>{
       this.setState({data:res.data.remainingInvestors})}) 
      .catch(err => this.setState({error:true}))
    }
  if(window.location.pathname==='/lawyers/'||window.location.pathname==='/lawyers'){
    axios
    .delete(`https://shrouded-basin-67688.herokuapp.com/api/lawyers/${id}`)
    .then(res =>{
     this.setState({data:res.data.remainingLawyers})}) 
    .catch(err => this.setState({error:true}))
  }
  if(window.location.pathname==='/reviewers/'||window.location.pathname==='/reviewers'){
      axios
      .delete(`https://shrouded-basin-67688.herokuapp.com/api/reviewers/${id}`)
      .then(res =>{
       this.setState({data:res.data.remainingReviewers})}) 
      .catch(err => this.setState({error:true}))
    }
        
}

redirectMEA=() => {
  window.location='admins'
}
redirectMER=() => {
  window.location='reviewers'
}
redirectMEL=() => {
  window.location='lawyers'
}
redirectMEI=() => {
  window.location='investors'
}

componentDidMount(){
  if(window.location.pathname==='/admins/'||window.location.pathname==='/admins'){
  axios
  .get('https://shrouded-basin-67688.herokuapp.com/api/admins')
  .then(res => this.setState({data:res.data.data}))
  .catch(err => this.setState({error:true}))
  }
  if(window.location.pathname==='/investors/'||window.location.pathname==='/investors'){
    axios
    .get('https://shrouded-basin-67688.herokuapp.com/api/investors')
    .then(res => this.setState({data:res.data.data}))
    .catch(err => this.setState({error:true}))
  }
  if(window.location.pathname==='/lawyers/'||window.location.pathname==='/lawyers'){
    axios
    .get('https://shrouded-basin-67688.herokuapp.com/api/lawyers')
    .then(res => this.setState({data:res.data.data}))
    .catch(err => this.setState({error:true}))
  }
  if(window.location.pathname==='/reviewers/'||window.location.pathname==='/reviewers'){
    axios
    .get('https://shrouded-basin-67688.herokuapp.com/api/reviewers')
    .then(res => this.setState({data:res.data.data}))
    .catch(err => this.setState({error:true}))
  }
}
  render() {
    return (
      <header> 
    <div class="center-div"> 
    <ButtonGroup aria-label="Basic example" >
      <Button variant="primary" onClick={this.redirectMEA}>Admins</Button>
      <Button variant="secondary" onClick={this.redirectMEI}>Investors</Button>
      <Button variant="primary" onClick={this.redirectMEL}>Lawyers</Button>
      <Button variant="secondary" onClick={this.redirectMER}>Reviewers</Button>
    </ButtonGroup>
    </div>
      <div className="App">
      <DeleteAccounts deleteMe = {this.deleteMe} users = {this.state}/>
      </div>
    </header>
      );
  }
}

export default App;
