import React, { Component } from 'react'
// import FormItem from '../form/formItem'
import '../../App.css'
import Axios from 'axios'


class ViewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
        investorId: this.props.investorId,
        formItems: [],
        loading: true,
        error: false,
        errorMessage: null
    }
  }

  componentDidMount () {
    console.log(this.state.investorId)
    console.log(typeof this.state.investorId)

    Axios
      .get("http://localhost:8000/api/investors/viewRejected/" + this.state.investorId)
      .then(
        res => {
          const resultArr = res.data.data
          const formItems = []
          var i
          for(i = 0; i < resultArr.length; i++) {
            console.log(resultArr[i].data)
            formItems.push(resultArr[i].data)
          }
          console.log(formItems)
          this.setState({ formItems: formItems, loading: false })
          console.log(this.state.formItems)
        }
      )
      .catch(error => {
        console.log( error['response'].data)
        this.setState( { errorMessage:  error['response'].data})
        this.setState({ error: true })
      })
      
  }

  // renderformItem(valuein){
  //   return <FormItem
  //     value = { valuein}
  //   />;
  // }

    
  // var i
  // for(i = 0; i < this.state.formItems; i++){
  //   this.renderformItem('A', 'B')
  // }


  render () {
    if(this.state.error){
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
        {/* <div>
          { this.renderformItem("B") }
        </div> */}
     </div>
    )
    
  }
}

export default ViewForm
