import React, { Component } from 'react';
import ViewForm from './pages/investorPages/ViewRejectedForms'
import Tracker from './pages/investorPages/Tracker'
import './App.css';

class App extends Component {
  render() {
    if(window.location.pathname === '/')
      return (
        <h1> Welcome to Gafi Web</h1>
      )
    if(window.location.pathname==='/investors/api/investors/viewRejected'||window.location.pathname==='/investors/api/investors/viewRejected/')
   return (
     <div> 
        <div>
        <h1>Hello, Investor!</h1>
        </div>
        <div>
          <Tracker > </Tracker>
        </div>
        <div>
        <ViewForm investorId="5ca776e7302e6260208998f6"> </ViewForm>
        </div>
    </div>
   // </viewForm>
      ) 
   }
  }

export default App;
