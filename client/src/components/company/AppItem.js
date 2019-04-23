import React, { Component } from 'react'


export class AppItem extends Component {

getStyle = () =>{
    return {
        background: 'f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted'
    }

}

  render() {
    if (localStorage.getItem('language') === 'English') {
    return (
      <div style ={this.getStyle()}>
      <p>
      {this.props.form.name}
      <button onClick= {this.props.cancel.bind(this,this.props.form._id)} style= {btnStyle} >Cancel </button>
    </p>
    </div>
      
    )
  }else{
    return (
      <div style ={this.getStyle()}>
      <p>
      {this.props.form.name}
      <button onClick= {this.props.cancel.bind(this,this.props.form._id)} style= {btnStyle} >الغاء </button>
    </p>
    </div>
      
    )
  }
  }
}
const btnStyle = {
  background: '#ff0000',
  color: 'fff',
  border: 'none',
  padding: '5px 8px',
  cursor: 'pointer',
  float: 'right',
  fontSize: 20,
  borderRadius: '50%'
}

export default AppItem
