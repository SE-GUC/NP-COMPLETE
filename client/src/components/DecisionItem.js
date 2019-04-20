import React, { Component } from 'react'

export class DecisionItem extends Component {
    getStyle = () =>{
        return {
            background: 'a3b4a4', 
            padding: '10px',
            borderBottom: '1px #ccc dotted',
        }
    }

    render () {
      if (localStorage.getItem('language') === 'English') {
      return (
        <div style={this.getStyle()}>
          <p>
          {
            (this.props.form.length !==0)?
            <h1> {this.props.form.data}</h1>
          :
          <h1>You have reviewed this form</h1>
          }
            {
            (this.props.form.length !==0)?
            <button onClick= {e=> this.props.accept(e , this.props.root)} style={btnStyle}> Accept </button>
            :
          <h1></h1>
          }
          {
            (this.props.form.length !==0)?
            <button onClick= {e=> this.props.reject(e , this.props.root)} style={btnStyle}> Reject </button>
            :
          <h1> </h1>
          }

          </p>
        </div>
      )
    } else{
      return (
        <div style={this.getStyle()}>
          <p>
          {
            (this.props.form.length !==0)?
            <h1> {this.props.form.data}</h1>
          :
          <h1>لقد قمت بمراجعة هذه الاستماره</h1>
          }
            {
            (this.props.form.length !==0)?
            <button onClick= {e=> this.props.accept(e , this.props.root)} style={btnStyle}> قبول </button>
            :
          <h1></h1>
          }
          {
            (this.props.form.length !==0)?
            <button onClick= {e=> this.props.reject(e , this.props.root)} style={btnStyle}> رفض </button>
            :
          <h1> </h1>
          }

          </p>
        </div>
      )
    }
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


export default DecisionItem