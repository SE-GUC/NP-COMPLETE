import React from 'react'
import { Container } from 'semantic-ui-react'
import '../../App.css'

export const Layout = (props) => (
  <Container centered>
    {props.children}
  </Container>
)
