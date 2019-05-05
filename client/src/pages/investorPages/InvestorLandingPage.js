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
                <DisplayCard title="Establish a company" text="Start your investments" buttonText="start now" id="fillForm" click={this.click} />
              </Grid.Column>

              <Grid.Column >
              <DisplayCard title="FAQ" text="Need help? check our FAQ" buttonText="Help" id="faq" click={this.click} />
              </Grid.Column>
           </Grid.Row>

           <Grid.Row relaxed>
              <Grid.Column >
              <DisplayCard title="My Companies" text="Keep track of your companies" buttonText="Take me there" id="company" click={this.click} />
              </Grid.Column>
              
              <Grid.Column >
              <DisplayCard title="Tracker" text="Track the progress of your company" buttonText="Take me there" id="tracker" click={this.click} />
              </Grid.Column>
           </Grid.Row>

           <Grid.Row relaxed>
              <Grid.Column >
              <DisplayCard title="Rejected Companies" text="View Rejected Companies" buttonText="Take me there" id="rejected" click={this.click} />
              </Grid.Column>
              
              <Grid.Column >
              <DisplayCard title="Pay Fees" text="Last step to establish your company" buttonText="Take me there" id="pay" click={this.click} />
              </Grid.Column>
           </Grid.Row>

           <Grid.Row relaxed>
              <Grid.Column >
              <DisplayCard title="Cnacel my Application" text="You can cancel unreviewed applications" buttonText="Take me there" id="cancel" click={this.click} />
              </Grid.Column>
              
              <Grid.Column >
              <DisplayCard title="Edit Application" text="Edit the details of your rejected application" buttonText="Take me there" id="edit" click={this.click} />
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
    if(this.state.type === 'tracker') {
      return <Redirect to='/investors/tracker' />
    }
    if(this.state.type === 'rejected') {
      return <Redirect to='/investors/viewRejected' />
    }
    if(this.state.type === 'pay') {
      return <Redirect to='/investors/payFees' />
    }
    if(this.state.type === 'cancel') {
      return <Redirect to='/investors/cancelApplication' />
    }
    if(this.state.type === 'edit') {
      return <Redirect to='/investors/editForm' />
    }
    
    
    
  }
}

export default InvestorLandingPage
