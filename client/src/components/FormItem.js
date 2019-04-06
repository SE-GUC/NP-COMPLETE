import React, { Component } from 'react'

export class FormItem extends Component {
  
    getStyle = () =>{
        return {
            background: 'a3b4a4', 
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    }

    render () {
        const {id, title} = this.props.form
      return (
        <div style={this.getStyle()}>
          <p>
          <button onClick= {this.props.accept.bind(this, id)} style={btnStyle}> Accept </button>
          <button onClick= {this.props.reject.bind(this, id)} style={btnStyle}> Reject </button>

          </p>
        </div>
      )
    }
}
    const btnStyle = {
        background: '#00a0ff',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right'
    }


export default FormItem