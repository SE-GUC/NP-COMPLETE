import React, { Component } from 'react'
import FormDisplay from '../../components/form/FormDisplay'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import Axios from 'axios'

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
    const { id } = this.props.match.params
    Axios
      .get('/api/investors/viewRejected/' + id)
      .then(
        res => {
          const resultArr = res.data.data
          const formItems = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            formItems.push(
              // resultArr[i].data
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
        }
      })
  }
  render () {
    console.log(this.state)
    console.log(this.props)
    if (this.state.loading) {
      return <h1> Loading </h1>
    }
    if (this.state.loading === false && this.state.error) {
      return (
        <div>
          <div>
            <h1>Error </h1>
          </div>
          <div>
            <h1> {this.state.errorMessage} </h1>
          </div>
        </div>
      )
    }

    if (this.state.loading === false && this.state.formItems.length === 0) {
      return (
        <h1> No companies to display</h1>
      )
    }
    return (
      this.state.formItems.map((x, i) => (
        <Container>
          <h1> {x.companyNames} </h1>
          <FormDisplay form={x.data} fields={x.fields} key={i} />
          <Row>
            <Col> Comment: </Col>
            <Col> {x.comment} </Col>
          </Row>
          <hr />
        </Container>
      ))
    )
  }
}

export default ViewForm
