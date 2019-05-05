import React, { Component } from 'react'
import Ejournals from '../components/Ejournals'
import { Header } from 'semantic-ui-react'

class CompnaiesEjournals extends Component {
  render () {
    return (
      <div className='CompnaiesEjournals'>
        <Header inverted centered as='h1'>E-Journal</Header>
        <Ejournals keys />
      </div>
    )
  }
}

export default CompnaiesEjournals
