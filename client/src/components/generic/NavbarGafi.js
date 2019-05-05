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
import { Link } from 'react-router-dom'
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
    },
    window.location.reload()
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

                <NavLink href='/investors/Faqs'>FAQ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/companies/Ejournals'>
                  EJournal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admins/ContactUs'>Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://web.facebook.com/GAFI-WEB-171892003742314/?modal=admin_todo_tour'>
                  Facebook
                </NavLink>
              </NavItem>
              <NavItem>
                <Button color='secondary' onClick={()=>this.onClick()}>العربية</Button>
              </NavItem>
              <NavItem>
                <Logout />
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                 
                  <Link to='/user/settings'><DropdownItem>Settings</DropdownItem></Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          
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
                <NavLink href='/investors/Faqs'>الاسئلة الشائعة</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/SE-GUC/NP-COMPLETE'>
                جريدة إلكترونية
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/companies/Ejournals'>اتصل بنا</NavLink>
              </NavItem>
              <NavItem>
                <Button color='secondary' onClick={()=>this.onClick()}>English</Button>
              </NavItem>
              <NavItem>
                <Logout />
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                  <DropdownItem>الاعدادات</DropdownItem>
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