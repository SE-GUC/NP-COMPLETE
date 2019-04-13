import React, { Component } from 'react'


export class CItem extends Component {

getStyle = () =>{
    return {
        background: 'f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted'
    }

}

  render() {
    return (
      <div style ={this.getStyle()}>
      <p>
      {this.props.form.name}
      <button onClick= {this.props.publish.bind(this,this.props.form._id)} style= {btnStyle} >publish </button>
    </p>
    </div>
      
    )
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

export default CItem
