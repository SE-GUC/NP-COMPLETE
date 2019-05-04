import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Container,
//   Divider,
//   Grid,
  Header,
  Icon,
//   Image,
//   List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
/* eslint-disable react/no-multi-comp */

const HomePageLayout = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Imagine-a-Company'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        
      }}
    />
    <Header
      as='h2'
      content='Do whatever you want when you want to.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button as={Link} to='/investors/fillForm' primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)
HomePageLayout.propTypes = {
  mobile: PropTypes.bool,
}
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { children } = this.props
    const { fixed } = this.state
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' ,top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={Link} to='/' active>Home</Menu.Item>
                <Menu.Item as={Link} to='/investors/Faqs'>FAQ</Menu.Item>
                <Menu.Item as={Link} to='/admins/ContactUs'>Contact Us</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={Link} to='/login' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as={Link} to='/investors/Register' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                  <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={()=>this.changeLang()}>العربية</Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomePageLayout />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}
DesktopContainer.propTypes = {
  children: PropTypes.node,
}
class MobileContainer extends Component {
  state = {}
  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })
  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as={Link} to='/' active>Home</Menu.Item>
          <Menu.Item as={Link} to='/investors/Faqs'>FAQ</Menu.Item>
          <Menu.Item as={Link} to='/admins/ContactUs'>Contact Us</Menu.Item>
          <Menu.Item as={Link} to='/login'>Log in</Menu.Item>
          <Menu.Item  onClick={ this.changeLang } >العربية</Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>

          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
              </Menu>
            </Container>
            <HomePageLayout mobile />
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}
MobileContainer.propTypes = {
  children: PropTypes.node,
}
const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)
ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}
const HomepageLayout = () => (
  <ResponsiveContainer>
  </ResponsiveContainer>
)
export default HomepageLayout