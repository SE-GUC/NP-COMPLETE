import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import FormItem from './components/FormItem'
import Forms from './components/Forms'
import Axios from 'axios';


class App extends Component {

  state = {
    forms: [
      {
        id: 1,
        title: 'balabizo1'
      },
      {
        id: 2,
        title: 'balabizo2'
      },
      {
        id: 3,
        title: 'balabizo3'
      }
    ]
  }
  accept = (id) =>{
    Axios
    .put('http://localhost:8000/api/reviewers/decideAnApplication/5c9257dcc9217e2a645ded67/5ca8a760b83402281471cd52' , {decision: true})
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (id) =>{
    Axios
    .put('http://localhost:8000/api/reviewers/decideAnApplication/5c9257dcc9217e2a645ded67/5ca8a760b83402281471cd52' , {decision: false})
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
      <Header/>
      <Forms forms = {this.state.forms}
         accept = {this.accept}
         reject = {this.reject}
      />      
      </div>
    );
  }
}

export default App;
