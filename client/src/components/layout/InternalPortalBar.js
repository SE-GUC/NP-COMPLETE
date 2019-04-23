import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu
} from 'semantic-ui-react'
import logo from '../../assets/gafi-logo.png'
import { Link } from 'react-router-dom'

const InternalPortalBar = (props) => (

  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          Internal Portal
        </Menu.Item>

        <Link to='/'>
          <Menu.Item as='a'>Home</Menu.Item>
        </Link>

        <Dropdown item simple text='My Work'>
          <Dropdown.Menu >
            {
              props.workList.map(({ text, link }, index) => (
                
                <Dropdown.Item as={Link} to={link}>
                  {text}
                </Dropdown.Item>
              ))
            }
            {/* <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

  </div>
)

export default InternalPortalBar
