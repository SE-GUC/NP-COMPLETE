import React from 'react'
import {changeLanguage} from '../../actions/langActions'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Form, FormControl, Button } from 'react-bootstrap'
import Logout from './Logout'
import { func } from 'prop-types'

class NavbarGafi extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  state = {
    language: localStorage.getItem('language')
  }
  onClick = (e) =>
{
  this.props.changeLanguage(
    {
      language : localStorage.getItem('language')
    }
  )
}
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    if(localStorage.getItem('language') === 'English'){
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>GAFI Web</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/About'>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/investors/Faqs'>FAQ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/SE-GUC/NP-COMPLETE'>
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admins/ContactUs'>Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={()=>this.onClick()}>العربية</Button>
              </NavItem>
              <Form inline>
                <FormControl
                  type='text'
                  placeholder='Search'
                  className='mr-sm-2'
                />
                <Button variant='outline-primary'>Search</Button>
              </Form>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                  <DropdownItem>Your profile</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Help</DropdownItem>
                  <DropdownItem>Settings</DropdownItem>
                  <DropdownItem>Sign out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          <Logout />
        </Navbar>
      </div>
    )
  }
  else{
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>موقع جافي</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/'>الرئيسية</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/About'>عن جافي</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/investors/Faqs'>الاسئلة الشائعة</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/SE-GUC/NP-COMPLETE'>
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admins/ContactUs'>اتصل بنا</NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={()=>this.onClick()}>English</Button>
              </NavItem>
              <Form inline>
                <FormControl
                  type='text'
                  placeholder='المراد البحث عنه'
                  className='mr-sm-2'
                />
                <Button variant='outline-primary'>ابحث</Button>
              </Form>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                  <DropdownItem>صفحتك</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>المساعدة</DropdownItem>
                  <DropdownItem>الاعدادات</DropdownItem>
                  <DropdownItem>تسجيل الخروج</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
  }
}

const mapStateToProps = state => ({
	language: state.lang.language
})

export default connect(mapStateToProps,{ changeLanguage })(NavbarGafi);