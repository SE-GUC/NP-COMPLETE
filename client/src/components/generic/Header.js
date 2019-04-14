import React from 'react'
import { Jumbotron, Container } from 'reactstrap'
import styled from 'styled-components'
import JumboImage from '../../assets/Jumbo-Pic.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${JumboImage}) no-repeat fixed bottom;
    background-size: cover;
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
  .fontH1 {
    font-family: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif;
    font-size: 50px;
    font-style: normal; font-variant: normal;
    font-weight: 700; 
    line-height: 26.4px;
    color: #5574a8;
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

function Header () {
  return (
    <Styles>
      <Jumbotron fluid className='jumbo'>
        <div className='overlay' />
        <Container>
          <h1 className='fontH1'>GAFI Web</h1>
          <br />
          <h2 className='fontH2'>Start your investment now</h2>
        </Container>

      </Jumbotron>
    </Styles>
  )
}

export default Header
