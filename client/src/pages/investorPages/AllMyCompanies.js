import React, { Component } from 'react'
import Mycompanies from '../../components/MyCompanies'
export class AllMyCompanies extends Component {
  render () {
    return (
      <div>
        <div className='AllMyCompanies'>
          <Mycompanies keys id={localStorage.getItem('id')} />
          {/* {this.props.match.params.id} */}
        </div>
      </div>
    )
  }
}

export default AllMyCompanies
