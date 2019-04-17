import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Form from '../../components/fees/Form'
class Money extends React.Component {
  render () {
    return (
      <StripeProvider apiKey='pk_test_gXEdE7jVq08xnKlW6KmsumaF00advWYnHN'>
        <Elements>
          <Form />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Money
