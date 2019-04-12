import React, { Component } from 'react'
import Mycompanies from '../../components/MyCompanies'
export class AllMyCompanies extends Component {
  render() {
    return (
      <div>
        <div className='AllMyCompanies'>
        <Mycompanies keys />
      </div>
      </div>
    )
  }
}

export default AllMyCompanies
