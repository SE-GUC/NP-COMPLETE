import React, { Component } from 'react'
import FormDisplay from '../../components/form/FormDisplay'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import Axios from 'axios'
import { Spinner, Alert } from 'react-bootstrap'
import { Divider, Header } from 'semantic-ui-react'

class ViewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formItems: [],
      loading: true,
      error: false,
      errorMessage: null
    }
  }

  componentDidMount () {
    const id = localStorage.getItem('id')
    this.setState({ loading: true, error: false })
    Axios
      .get('/api/investors/viewRejected/' + id)
      .then(
        res => {
          const resultArr = res.data.data
          const formItems = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            formItems.push(
              {
                fields: resultArr[i].fields,
                descriptions: resultArr[i].descriptions,
                data: resultArr[i].form.data,
                comment: resultArr[i].form.comment,
                companyNames: resultArr[i].name
              }

            )
          }
          this.setState({ formItems: formItems, loading: false })
        }
      )
      .catch(error => {
        if (error['response']) {
          console.log(error['response'].data)
          this.setState({ error: true, loading: false, errorMessage: error['response'].data.message })
        } else {
          console.log(error)
          this.setState({ error: true, loading: false })
        }
      })
  }
  render () {
    if (localStorage.getItem('language') === 'English') {
      if (this.state.loading) {
        return <div className='App'><Spinner animation='border' variant='primary' /></div>
      }
      if (this.state.loading === false && this.state.error) {
        return <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>
      }

      if (this.state.loading === false && this.state.formItems.length === 0) {
        return (
          <Alert className='App' variant='danger'>No companies to display</Alert>
        )
      }
      return (
        this.state.formItems.map((x, i) => (
          <Container>
            <Header inverted as='h1'>Company: {x.companyNames} </Header>
            <FormDisplay form={x.data} fields={x.fields} key={i} />
            <Row>
              <Col> Comment: </Col>
              <Col> {x.comment} </Col>
            </Row>
            <Divider inverted />
          </Container>
        ))
      )
    } else {
      if (this.state.loading) {
        return <div className='App'><Spinner animation='border' variant='primary' /></div>
      }
      if (this.state.loading === false && this.state.error) {
        return <Alert className='App' variant='danger'>يبدو ان ثمة مشكلة الرجاء حاول مجددا</Alert>
      }

      if (this.state.loading === false && this.state.formItems.length === 0) {
        return (
          <Alert className='App' variant='danger'>لا يوجد شركات لعرضها</Alert>
        )
      }
      return (
        this.state.formItems.map((x, i) => (
          <Container>
            <h1> {x.companyNames} :الشركة</h1>
            <FormDisplay form={x.data} fields={x.fields} key={i} />
            <Row>
              <Col>: تعليق</Col>
              <Col> {x.comment} </Col>
            </Row>
            <hr />
          </Container>
        ))
      )
    }
  }
}

export default ViewForm
