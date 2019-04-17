import React from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'
import Axios from 'axios';

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      amount: '',
      error: false
    }
  }
  handleSubmit = async (e)=>{
      e.preventDefault()
      try{
          let Token =await this.props.stripe.createToken()
          const Amount=parseInt(this.state.amount)
          Axios
          .post('/api/investors/fees',{token:Token.token,amount:Amount})
          .then(res=>console.log(res))
          .catch(err=>alert(err))
      } catch(e) {
          throw e
      }
  }
  render () {
    return (
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
          <input
            type='text'
            className='input-group my-1'
            value={this.state.amount}
            onChange={e => this.setState({ amount: e.target.value })}

          />
          <label>Credit Card number-- EXP Date --CVC</label>
          <CardElement className='p-2 border border-dark' />
          <button className='btn btn-primary border border-dark shadow'>Charge it</button>
        </form>
      </main>
    )
  }
}
export default injectStripe(Form)
