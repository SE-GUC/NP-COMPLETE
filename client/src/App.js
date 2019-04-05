import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar'
import Faq from './components/Faq'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Faq />
      </div>
    );
  }
}

export default App;
