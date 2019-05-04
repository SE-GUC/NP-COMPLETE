import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import store from '../store'

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '', 
      type: props.type
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onClick = (e) => {
    this.props.login(
      {
        "email": this.state.email,
        "password": this.state.password
      }, 
      this.state.type
    )
  }

  render(){
    if(!this.props.isLoggedIn) {
    return(

        <div className='login-form'>
          {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
          <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
          </style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/logo.png' /> Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input 
                    name='email'
                    fluid icon='user' iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.email} 
                    onChange={this.onChange} 
                  />
                  <Form.Input
                    fluid
                    name='password'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />

                  <Button color='teal' fluid size='large' onClick= { this.onClick}>
                  Login
                  </Button>
                </Segment>
              </Form>
             
              <Message as={Link} to="/investors/Register">
              New to us? Sign Up
              </Message>
              
            </Grid.Column>
          </Grid>
        </div>
      )
    } else {
      if(store.getState().auth.loggedUser.type === 'Investor'){
        return <Redirect to='/investor' />}
      else{
        return <Redirect to='/internalportal/workpage' />
      }
    }

  }

}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
	loggedUser: state.auth.loggedUser,
})

export default connect(mapStateToProps,{ login })(LoginForm);

