import React, { Component } from 'react'

export class CompanyItem extends Component {
  
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
          {
            (this.props.company.length !==0)?
            <h1> {this.props.company.name}</h1>
          :
          <h1>You have paid this company's fees</h1>
          }
            {
            (this.props.company.length !==0)?
            <button onClick= {e=> this.props.pay(e , this.props.root)} style={btnStyle}> PayFees </button>
            :
          <h1></h1>
          }
          
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


export default CompanyItem