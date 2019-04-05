import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ViewCases from './ViewCases'
import App from './App'

if (window.location.pathname === '/companies' || window.location.pathname === '/companies/') {
  ReactDOM.render(<ViewCases />, document.getElementById('root'))
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}
