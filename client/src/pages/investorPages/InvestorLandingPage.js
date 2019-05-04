import React, { Component } from 'react'
import { Container, Header, Card, Grid } from 'semantic-ui-react'
import '../../layout/styles.css'
import DisplayCard from '../../components/generic/DisplayCard'
import Faqs from './Faqs'
import ChooseForm from './ChooseForm'
import { Redirect } from 'react-router-dom'

class InvestorLandingPage extends Component {
  constructor(props) {
  super(props)
    this.state = {
      type: '',
      id: localStorage.getItem('id')
    }
  }

  click = (e) => {
    const type = e.target.id
    this.setState({type:type})
  }

  render () {
    console.log(this.state.type)
    if(this.state.type === ''){

      return (
        <Container>
        <Grid padded='horizontally' textAlign='center' centered>
        <Grid.Row columns={1}>
          <Header inverted as='h1'>Welcome Investor </ Header>

        </Grid.Row>
        </Grid>
        <Grid relaxed textAlign='center' centered>
          <Card.Group itemsPerRow={2} padded centered textAlign='center'>
           
           <Grid.Row relaxed>

              <Grid.Column>
                <DisplayCard title="Establish a company" text="Start your investments" buttonText="fill form" id="fillForm" click={this.click} />
              </Grid.Column>

              <Grid.Column >
              <DisplayCard title="FAQ" text="Need help? check our FAQ" buttonText="help" id="faq" click={this.click} />
              </Grid.Column>
           </Grid.Row>
           <Grid.Row relaxed>
              <Grid.Column >
              <DisplayCard title="My Companies" text="Keep track of your companies" buttonText="show companies" id="company" click={this.click} />
              </Grid.Column>
              
              <Grid.Column >
              <DisplayCard title="Additional functionality" text="Coming soon..." buttonText="show companies" id="company" click={this.click} />
              </Grid.Column>
           </Grid.Row>

          </Card.Group>
        </Grid>
  
        </Container>
  
      )
    } 
    if(this.state.type === 'company') {
      return <Redirect to='/investors/MyCompanies' />
    }
    if(this.state.type === 'faq') {
      return <Redirect to='/investors/Faqs' />
    }
    if(this.state.type === 'fillForm') {
      return <Redirect to='/investors/fillForm' />
    }
  }
}

export default InvestorLandingPage
