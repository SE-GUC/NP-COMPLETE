import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import DeleteAccounts from './components/DeleteAccounts'
class App extends Component {
  state = {data:[]}
  deleteMe =id =>{
    axios
    .delete(`https://shrouded-basin-67688.herokuapp.com/api/admins/${id}`)
    .then(res =>{
     this.setState({data:res.data.remainingAdmins})}) 
    .catch(err => this.setState({error:true}))
}
componentDidMount(){
  axios
  .get('https://shrouded-basin-67688.herokuapp.com/api/admins')
  .then(res => this.setState({data:res.data.data}))
  .catch(err => this.setState({error:true}))
}
  render() {
    return (
      <div className="App">
      <DeleteAccounts deleteMe = {this.deleteMe} admins = {this.state}/>
      </div>
    );
  }
}

export default App;
