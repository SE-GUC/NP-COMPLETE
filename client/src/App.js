import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import acceptOrReject from './pages/acceptOrReject'
import './App.css'

class App extends Component {
  render () {
    return (

      <Router>
          <div>
            <Route exact path ='/reviewers/acceptOrReject/:reviewerId/:companyId' component={acceptOrReject} />
          </div>
      </Router>
    )
  }
}

export default App