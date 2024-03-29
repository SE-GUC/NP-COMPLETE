import React, { Component } from 'react'
import axios from 'axios'
import Company from '../components/company/Company'
import Spinner from 'react-bootstrap/Spinner'

export class PublishCompany extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      errorMessage: null,
      companies: []
    }
  }

  componentDidMount () {
    this.setState({loading: true})
    axios
      .get('/api/companies/')
      .then(
        res => {
          const resultArr = res.data.data
          const c = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            if (resultArr[i].form.acceptedByReviewer === 1 &&
                resultArr[i].form.acceptedByLawyer === 1 &&
                resultArr[i].form.paid === true && 
                resultArr[i].accepted === true &&
                resultArr[i].state !== 'Established') {
              c.push(resultArr[i])
            }
          }
          this.setState({ companies: c, loading: false })
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
    if (this.state.loading === false && this.state.companies.length === 0) {
      return (
        <h1> No companies to publish</h1>
      )
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

    return (
      <div className='App'>
        <div>
          {this.state.loading ? <Spinner animation="border" variant= "primary" />
            : <Company forms={this.state.companies} publish = {this.publish} /> }
        </div>
      </div>

    )
  }

publish = (id) => {
console.log(id)
axios
.put(`/api/admins/publishCompany/${id}`)
.then(res=>alert(res.data.message))
.catch(error=> alert(error))
this.setState({companies: this.state.companies.filter(company => company._id !== id )})
}

}

export default PublishCompany
