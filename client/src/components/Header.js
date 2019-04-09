import React from 'react'

function Header () {
  return (
    <header style={headerStyle}>
      <h1>Accept or Reject the Company</h1>
    </header>
  )
}

const headerStyle = {
  background: '#fff',
  color: '#000',
  textAlign: 'center'
}

export default Header
