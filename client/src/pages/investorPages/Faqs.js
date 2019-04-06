import React, { Component } from 'react';
import AppNavbar from '../../components/AppNavbar'
import Faq from '../../components/Faq'
import 'bootstrap/dist/css/bootstrap.min.css';

class Faqs extends Component {
  render() {
    return (

      <div className="App">
        <AppNavbar />
        <Faq />
      </div>
    ) 
   }
  }

export default Faqs;
