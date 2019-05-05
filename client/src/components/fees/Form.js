import React from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'
import Axios from 'axios';
import {Button} from 'semantic-ui-react'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      amount: `${this.props.fees}`,
      error: false,
      paid:false
    }
  }
  handleSubmit = async (e)=>{
      e.preventDefault()
      try{
          let Token =await this.props.stripe.createToken()
          const Amount=parseInt(this.state.amount)
          Axios
          .post('/api/investors/fees',{token:Token.token,amount:Amount})
          .then(res=>{
            console.log(res)
            this.setState({paid:true})
          })
          .catch(err=>this.setState({error:true}))
      } catch(e) {
          throw e
      }
  }
  render () {

    return (
      this.state.amount==='0'?
      <h1>you currently have no fees to pay for this company</h1>
     
      :

      <main className='container'>
        <form
          className='form-group'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <label>Name</label>
          <input
            type='text'
            className='input-group my-1'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}

          />
          <label>Amount</label>
          <fieldset disabled>
            <div >
              <div className='col-sm-10'>
                <input type='text' id='disabledTextInput' class='form-control' placeholder={this.props.fees} />
              </div>
            </div>
          </fieldset>
        
          <label>Credit Card number-- EXP Date --CVC</label>
          <CardElement className='p-2 border border-dark' />
          <Button inverted>Pay Fees</Button>
        </form>
      </main>
    )
  }
}
export default injectStripe(Form)
