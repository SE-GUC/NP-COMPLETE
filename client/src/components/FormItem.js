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
      return (
        <div style={this.getStyle()}>
          <p>
          <h1>{this.props.form.name}</h1>
          <button onClick= {e => this.props.accept(e, this.props.form._id, this.props.root)} style={btnStyle}> Accept </button>
          <button onClick= {e => this.props.reject(e, this.props.form._id, this.props.root)} style={btnStyle}> Reject </button>

          </p>
        </div>
      )
    }
}
    const btnStyle = {
        background: '#00a0ff',
        color: '#fff',
        border: 'none',
        padding: '10px 90px',
        cursor: 'pointer',
        float: 'center',
        fontSize: 50,
        margin: '20px'
    }


export default FormItem