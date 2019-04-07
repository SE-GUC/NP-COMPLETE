import React, { Component } from 'react'
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
      .get('http://localhost:8000/api/investors/viewRejected/' + id)
      .then(
        res => {
          const resultArr = res.data.data
          const formItems = []
          var i
          for (i = 0; i < resultArr.length; i++) {
            formItems.push(resultArr[i].data)
          }
          this.setState({ formItems: formItems, loading: false })
        }
      )
      .catch(error => {
        console.log(error['response'].data)
        this.setState({ errorMessage: error['response'].data })
        this.setState({ error: true })
      })
  }
  render () {
    if (this.state.error) {
      return (
        <div>
          <h1> Error </h1>
        </div>
      )
    }
    return (
      <div>
        <div className='Forms'>
          <p> {this.state.formItems} </p>
        </div>
      </div>
    )
  }
}

export default ViewForm
