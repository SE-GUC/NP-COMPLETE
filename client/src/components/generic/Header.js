import React from 'react'
import { Jumbotron, Container } from 'reactstrap'
import styled from 'styled-components'

const Styles = styled.div`
  .jumbo {
    background-size: cover;
    color: #becbe0;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #becbe0;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .font {
    font-family: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif;
    font-style: normal; font-variant: normal;
    font-weight: 700; 
    line-height: 26.4px;
    color: #6882ad;
    text-align: center;
  }
  `

function Header () {
  return (
    <Styles>
      <Jumbotron fluid className='jumbo'>
        <div className='overlay' />
        <Container>
          <h1 className='font'>GAFI Web</h1>
        </Container>

      </Jumbotron>
    </Styles>
  )
}

export default Header
