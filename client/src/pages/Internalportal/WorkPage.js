import React, { Component } from 'react'
import DisplayCard from '../../components/generic/DisplayCard'
import { Header, Grid, Card, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class WorkPage extends Component {
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
    const lawyerWorkList = [
      { title: 'Walk in applications', link: '/lawyers/viewAllWalkInCases', id: 'lawWalk' },
      { title: 'Portal Applications', link: '/lawyers/viewAllPortalCases', id: 'lawPort' },
      { title: 'Start Walk in App', link: '/lawyers/fillForm', id: 'lawFillForm' },
      { title: 'Edit Walk in App', link: '/lawyers/editForm', id: 'lawEditForm' },
      { title: 'Calculate Fees', link: '/lawyers/CalcFees', id: 'lawCalc' },
      { title: 'Decide an application', link: '/lawyers/review', id: 'lawReview' },
      { title: 'Add a comment on a rejected application', link: '/lawyers/addComment', id: 'lawComm' },
      { title: 'Show last worked', link: '/lawyers/showLastWorked', id: 'lawLast' }
    ]
    const adminWorkList = [
      { title: 'View All Portal Applications', link: '/admins/viewAllPortalCases', id: 'adWalk' },
      { title: 'View All Walk in Applications', link: '/admins/viewAllWalkInCases', id: 'adPort' },
      { title: 'Delete Admin', link: '/admins/deleteAdmin', id: 'adDelAd' },
      { title: 'Delete Lawyer', link: '/admins/deleteLawyer', id: 'adDelLaw' },
      { title: 'Delete Reviwer', link: '/admins/deleteReviewer', id: 'adDelRev' },
      { title: 'Delete Investor', link: '/admins/deleteInvestor', id: 'adDelInv' },
      { title: 'Register Employees', link: '/admins/registerInternal', id: 'adReg' },
      { title: 'Publish Companies', link: '/admins/publishCompany', id: 'adpub' },
      { title: 'Show last worked', link: '/admins/showLastWorked', id: 'adLast' }
    ]

    const reviewerWorkList = [
      { title: 'Walk in applications', link: '/reviewers/viewAllWalkInCases', id: 'revWalk' },
      { title: 'Portal Applications', link: '/reviewers/viewAllPortalCases', id: 'revPort' },
      { title: 'Decide an application', link: '/reviewers/acceptOrReject', id: 'revDecide' },
      { title: 'Add a comment on a rejected application', link: '/reviewers/addComment', id: 'revaddCom' },
      { title: 'Show last worked', link: '/reviewers/showLastWorked', id: 'revLast' }
    ]

    var workList = []
    if (localStorage.getItem('type') === 'Lawyer') {
      workList = lawyerWorkList
    }
    if (localStorage.getItem('type') === 'Reviewer') {
      workList = reviewerWorkList
    }
    if (localStorage.getItem('type') === 'Admin') {
      workList = adminWorkList
    }

    if(this.state.type === '' && workList !== []){
      return (
        <Container>
          <Grid padded='horizontally' textAlign='center' centered>
            <Grid.Row columns={1}>
              <Header inverted as='h1'>
              Welcome Lawyer
              </Header>
            </Grid.Row>
          </Grid>

          <Grid relaxed textAlign='center' centered>
            <Card.Group itemsPerRow={2} padded centered textAlign='center'>

              {workList.map(({ title, link, id }, index) => (
                <Grid.Row relaxed>
                  <Grid.Column>
                    <DisplayCard title={title} buttonText='Take me there' id={id} click={this.click} />
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Card.Group>
          </Grid>

        </Container>
      )
    }

    if(this.state.type === 'lawWalk') {
      return <Redirect to='/lawyers/viewAllWalkInCases' />
    }
    if(this.state.type === 'lawPort') {
      return <Redirect to='/lawyers/viewAllPortalCases' />
    }
    if(this.state.type === 'lawFillForm') {
      return <Redirect to='/lawyers/fillForm' />
    }
    if(this.state.type === 'lawEditForm') {
      return <Redirect to='/lawyers/editForm' />
    }
    if(this.state.type === 'lawCalc') {
      return <Redirect to='/lawyers/CalcFees' />
    }
    if(this.state.type === 'lawReview') {
      return <Redirect to='/lawyers/review' />
    }
    if(this.state.type === 'lawComm') {
      return <Redirect to='/lawyers/addComment' />
    }
    if(this.state.type === 'lawLast') {
      return <Redirect to='/lawyers/showLastWorked' />
    }


    if(this.state.type === 'adWalk') {
      return <Redirect to='/admins/viewAllWalkInCases' />
    }
    if(this.state.type === 'adPort') {
      return <Redirect to='/admins/viewAllPortalCases' />
    }
    if(this.state.type === 'adDelAd') {
      return <Redirect to='/admins/deleteAdmin' />
    }
    if(this.state.type === 'adDelLaw') {
      return <Redirect to='/admins/deleteLawyer' />
    }
    if(this.state.type === 'adDelRev') {
      return <Redirect to='/admins/deleteReviewer' />
    }
    if(this.state.type === 'adDelInv') {
      return <Redirect to='/admins/deleteInvestor' />
    }
    if(this.state.type === 'adReg') {
      return <Redirect to='/admins/registerInternal' />
    }
    if(this.state.type === 'adpub') {
      return <Redirect to='/admins/publishCompany' />
    }
    if(this.state.type === 'adLast') {
      return <Redirect to='/admins/showLastWorked' />
    }


    if(this.state.type === 'revWalk') {
      return <Redirect to='/reviewers/viewAllWalkInCases' />
    }
    if(this.state.type === 'revPort') {
      return <Redirect to='/reviewers/viewAllPortalCases' />
    }
    if(this.state.type === 'revDecide') {
      return <Redirect to='/reviewers/acceptOrReject' />
    }
    if(this.state.type === 'revaddCom') {
      return <Redirect to='/reviewers/addComment' />
    }
    if(this.state.type === 'revLast') {
      return <Redirect to='/reviewers/showLastWorked' />
    }

    return (
      <h1>Log In Please!</h1>
    )
  }
}

export default WorkPage
