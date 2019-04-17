import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import ShowForms from './ShowForms';

export class ShowCompanies extends Component {
    state = {
          Forms:this.props.Forms
        }

  render() {
      console.log(this.state.Forms)
    return ( 
        <div>
            <Button variant='danger' onClick={()=>this.setState({Forms:this.state.Forms.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))})}>Sort by Name</Button>
            <Button variant='danger' onClick={()=>this.setState({Forms:this.state.Forms.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
            <ShowForms cases = {this.state.Forms} chooseForm={this.props.chooseForm}/>
        </div>
    )
  }
}

ShowCompanies.propTypes = {
cases: PropTypes.array
}

export default ShowCompanies
