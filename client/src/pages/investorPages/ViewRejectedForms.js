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
            formItems.push(
              // resultArr[i].data
              {
                data: resultArr[i].data,
                comment: resultArr[i].comment
              }
              
              )
          }
          this.setState({ formItems: formItems, loading: false })
        }
      )
      .catch(error => {
        console.log(error['response'].data)
        this.setState({error: true, loading: false, errorMessage: error['response'].data })
      })
  }
  render () {
    console.log(this.state)
    console.log(this.props)
    if(this.state.loading) {
      return <h1> Loading </h1>
    }
    if (this.state.loading === false && this.state.error) {
      return (
        <div>
          <h1> Error </h1>
        </div>
      )
    }

    if(this.state.loading === false && this.state.formItems.length === 0){
      return (
        <h1> No companies to display</h1>
      )
    }
    return (
      this.state.formItems.map( x => (
           <div>
              <p> Form data: </p>
              <p> {x.data} </p>
              <p> Comment </p>
             <p> {x.comment }</p>
           </div>
         ))
    )
  }
}

export default ViewForm
