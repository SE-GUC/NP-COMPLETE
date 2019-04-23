import React, { Component } from 'react'
import styled from 'styled-components'

const Styles = styled.div`
  
  .fontH1 {
    font-family: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif;
    font-size: 40px;
    font-style: normal; font-variant: normal;
    font-weight: 700; 
    line-height: 26.4px;
    color: #6682b2;
    text-align: center;
    vertical-align: center;
  }
  .fontH2 {
    font-family: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif;
    font-size: 25px;
    font-style: normal; font-variant: normal;
    font-weight: 700; 
    line-height: 26.4px;
    color: #c27070;
    text-align: center;
    
  }
  `
class Header2 extends Component {
  render () {
    if (this.props.title) {
      return (
        <Styles>

          <h1 className='fontH1'>{this.props.title}</h1>
        </Styles>
      )
    }

    if (this.props.h2) {
      return (
        <Styles>

          <h2 className='fontH2'>{this.props.title}</h2>
        </Styles>
      )
    }
  }
}

export default Header2
