import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Form, Alert, Col } from 'react-bootstrap'


class giveFeedback extends Component {

  state = {
    loading: true,
    done: false,
    feedback: ''
  }

    submit = () => {
        if(this.submit.length !== 0){
        this.setState({ feedback: this.submit })
        const { companyId , investorId } = this.props.match.params
        Axios
        .put(`/api/investors/reviewOnlineService/${companyId}/${investorId}` , {feedback: this.submit})
        .then(res => this.setState({loading: false , done: true}))
        .catch(err => {
            console.log(err)
          })
        }
    }

  render() {
    return (
      <div>    
          {this.state.done? <h1> Submitted Feedback</h1> :
       <div>
       <Form.Group id='feedbacks' controlId='exampleForm.ControlTextarea1'>
            <Form.Label id='feedbackLable'>Comments</Form.Label>
            <Form.Control id='feedbackArea' as='textarea' onChange={(event) => { this.submit = event.target.value }} />
        </Form.Group>     
        <button onClick = { this.submit  }> Submit Feedback </button> 
        </div>
          }
      </div>
    )
  }
}

export default giveFeedback 