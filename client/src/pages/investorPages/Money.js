import React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Form from '../../components/fees/Form'
import Axios from 'axios';
import ShowCompanies from '../../components/fees/ShowCompanies';
class Money extends React.Component {
  state = {
    companyID:"",
    FormChosen:false,
    loading:true,
    allForms:[],
    fees:0,
    myID:"5cb3963066141874ec9df12b" // localStorage.getItem('id')

  }

  async componentDidMount (){
  if(!this.state.FormChosen)
  {
    const res = await Axios.get(`/api/investors/getAllCompanies/${this.state.myID}`)
    const data=res.data.data
    const forms=[]
    for(var i=0;i<data.length;i++) {
      if (data[i].form.acceptedByLawyer === 1 && data[i].form.acceptedByReviewer === 1)
       {
        forms.push(data[i])
      }
    }
    await this.setState({allForms:forms,loading:false})
  }  
  }
  chooseForm = (id,fees)=>{
    this.setState({companyID:id,fees:fees,FormChosen:true})
  }
  

  render () {
    return (
      this.state.loading?
      <h1>Loading please wait</h1>
      :
      !this.state.FormChosen?
      <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
      
      :

      <StripeProvider apiKey='pk_test_gXEdE7jVq08xnKlW6KmsumaF00advWYnHN'>
        <Elements>
          <Form fees={this.state.fees}/>
        </Elements>
      </StripeProvider>
    )
  }
}

export default Money
