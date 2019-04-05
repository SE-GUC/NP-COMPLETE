import React, { Component } from 'react'
import '../App.css'
export class caseItem extends Component {
  getStyle = () => {
    return {
      backgroundColor : '#f4f4f4f4',
      borderBottom: '1px #ccc dotted'
     }

  }

  render () {
    return (
      <div style = {this.getStyle()} >
        <p>
        <input type='checkbox' onChange={this.props.Choose.bind(this,this.props.current._id)}/> {'  '}
        { this.props.current.name}
        <button style={btnStyle} onClick={this.props.delCase.bind(this,this.props.current._id)}>X</button>
        </p>
      </div>
    )   
  }
 
}

const btnStyle={
 background:'#ff0000',
 color:'#ffff',
 border:'none',
 padding:'5px 10px',
 borderRadius:'pointer',
 float:'right'
}
export default caseItem
