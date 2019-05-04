import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import ShowForms from './ShowForms';

export class ShowCompanies extends Component {
    state = {
          Forms:this.props.Forms,
          filtered:[]
        }
  handleNameChange =(evnt)=>{
    this.setState( 
      { filtered:[...this.state.Forms.filter((current)=> current.name.includes(evnt.target.value))]
      })
  }
  render() {
    console.log(this.props.Forms)
    const formsToView=this.state.filtered.length>0?
    <ShowForms cases = {this.state.filtered} chooseForm={this.props.chooseForm}/>
    :
    <ShowForms cases = {this.state.Forms} chooseForm={this.props.chooseForm}/>
    return ( 
        <div>
          <label>search by name</label>
            <input
            type="text"
            placeholder={"Company Name"}
            onChange={this.handleNameChange}
            />
            <Button variant='danger' onClick={()=>this.setState({Forms:this.state.Forms.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0))})}>Sort by Name</Button>
            <Button variant='danger' onClick={()=>this.setState({Forms:this.state.Forms.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))})}>Sort by ID</Button>
            {formsToView}
        </div>
    )
  }
}

ShowCompanies.propTypes = {
cases: PropTypes.array
}

export default ShowCompanies
