import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse } from 'reactstrap'
import Axios from 'axios';

export class LawyerCaseCard extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.toggle1 = this.toggle1.bind(this)

    this.state = {
      // rejected: false,
      done: false,
      collapse: false,
      collapse1: false,
      comment: '',
      nocomment :false
    }
  }
  accept = (e , root) =>{
    e.preventDefault()
    const lawyerId = '5cba2b7864df6c23283bea52'  //change to redux
    const companyId = this.props.data._id
    Axios
    .put(`/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 1 })
    .then(res => {this.setState({ forms: [] , done: true })})
    .catch(err => {
      console.log(err)
    })
    .catch(this.setState({ loading: false}))
    this.toggle()
  }

  reject = async (e , root) =>{
    await  this.setState({ comment: this.reject })
    if(this.state.comment.length > 5){
    console.log(this.state.comment
        .length)
    this.setState({ nocomment: false })
    e.preventDefault()
    const lawyerId = '5cba2b7864df6c23283bea52'  //change to redux
    const companyId = this.props.data._id
    Axios
    .put(`/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 0 , comment: this.state.comment })
    .then(res => {this.setState({ forms: [] ,done: true })})
    .catch(err => {
      console.log(err)
    }).catch(this.setState({done: true , loading: false}))
    this.toggle()
    this.toggle1()
}else{
  this.setState({nocomment: true})
  console.log(this.state.nocomment)
  this.toggle1()

}
}
// addcomment = (e , root) =>{
//   if(this.reject.length !== 0){
//     this.setState({ comment: this.reject })
//   this.setState({rejected: true})
//   e.preventDefault()
//   const reviewerId = '5cba2b7864df6c23283bea4d'  //change to redux
//   const companyId = this.props.data._id
//   Axios
//   .put(`/api/reviewers/addComment/${reviewerId}/${companyId}`  , {comment : this.state.comment })
//   .then(res => {this.setState({ done: true })})
//   .catch(err => {
//     console.log(err)
//   })
//   .catch(this.setState({done: true , loading: false}))
//   this.toggle1()
// }
// }

  toggle1 () {
    this.setState(state => ({ collapse1: !state.collapse1 }))
  }
  toggle (){
    this.setState(state => ({collapse: !state.collapse}))
  }

  render () {
    return (
      //  <div>
      <CardDeck>
        <Card>
          <Button variant ='primary' onClick={this.toggle} >{this.props.data.name}{ this.state.nocomment? <h1>Please enter a comment</h1> : this.state.done?<h4>Reviewed</h4>:<h4> </h4> }</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card.Body>
              <Card.Title><h4>Name : {this.props.data.name}</h4></Card.Title>
              <Card.Text>
                Type : {this.props.data.type}
                {/* <p />
                {this.props.data.form.data} */}
                {/* <p />
                {this.props.data.} */}
              </Card.Text>
            </Card.Body>
            <Button variant ='primary' onClick={this.accept} >Accept</Button>{' '}
            <Button variant ='primary' onClick={this.toggle1} >Reject</Button>
            <h1> </h1>
           
          </Collapse>
          <Collapse isOpen = {this.state.collapse1}>
          <textarea class='form-control' rows='5' id='comment' onChange={(event) => { this.reject = event.target.value }} />
          <Button color='primary' onClick = { this.reject } style={{ marginBottom: '1rem' }} > Submit comment </Button> 
          </Collapse>
          
        </Card>
       
      </CardDeck>
      //  {/* </div> */}
    )
  }
}

export default LawyerCaseCard
