import React, { Component } from 'react'
import AppNavbar from '../../components/AppNavbar'
import Faq from '../../components/Faq'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

class Faqs extends Component {
  render () {
    return (

      <div className='App'>
        <Button href='/investor'>Back</Button>

        <Faq />
      </div>
    )
  }
}

export default Faqs
