import React, { Component } from 'react'
import Mycompanies from '../../components/MyCompanies'
import { Header } from 'semantic-ui-react'
export class AllMyCompanies extends Component {
  render () {
    return (
      <div>
        <div className='AllMyCompanies'>
          <Header inverted as='h1'>My Companies</Header>
          <Mycompanies keys id={localStorage.getItem('id')} />
        </div>
      </div>
    )
  }
}

export default AllMyCompanies
