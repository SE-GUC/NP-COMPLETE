import React, { Component } from 'react'
import axios from 'axios'
import Apps from '../../components/company/Apps'
import Header2 from '../../components/Header2'

export class CancelApplication extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      errorMessage: null,
      apps: []
    }
  }

  componentDidMount () {
    const { investorId } = this.props.match.params
     axios
      .get('http://localhost:8000/api/companies/')
      .then(
        res => {
          const resultArr = res.data.data
          const applications = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            if (resultArr[i].investorId === investorId && resultArr[i].form.acceptedByReviewer === -1) { 
                applications.push(resultArr[i]) 
            }
          }
          this.setState({ apps: applications, loading: false })
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

    if (this.state.loading === false && this.state.apps.length === 0) {
        return (
          
          <h1> You don't have any unreviewed applications</h1>
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
          {this.state.loading ? <h1>Loading..</h1>
            : <div> <Header2 title='Cancel an Application' /> 
            <Apps forms={this.state.apps} cancel={this.cancel} /> </div>}
        </div>
      </div>

    )
  }

    cancel =  (id) => {
    console.log(id)
    const investorId = this.props.match.params
    console.log(investorId)
    axios
      .delete('http://localhost:8000/api/companies/'+ id)
      .then( res => {
        //console.log(res.data.deletedCompany)
          this.setState({apps: [...this.state.apps.filter(app => app._id !== id )]})
      })
          
      .catch(error => {
        if (error['response']) {
          console.log(error['response'].data)
          this.setState({ error: true, loading: false, errorMessage: error['response'].data.message })
        } else {
          console.log(error)
        }
      })
}
}

export default CancelApplication
