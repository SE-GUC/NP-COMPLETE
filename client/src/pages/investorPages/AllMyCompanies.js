import React, { Component } from 'react'
import Mycompanies from '../../components/MyCompanies'
import { Button } from 'react-bootstrap'
export class AllMyCompanies extends Component {
  render () {
    return (
      <div>
        <Button href='/investor'>Back</Button>
        <div className='AllMyCompanies'>
          <Mycompanies keys id={localStorage.getItem('id')} />
          {/* {this.props.match.params.id} */}
        </div>
      </div>
    )
  }
}

export default AllMyCompanies
