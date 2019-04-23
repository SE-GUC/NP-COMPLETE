import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Axios from 'axios';
import ShowCompanies from '../../components/fees/ShowCompanies'
export class CalcFees extends Component {
    
    state = {
      companyId:"",
      loading:true,
      idEntered:false,
      lawyerID:localStorage.getItem('id'),
      allForms:[],
      error:false
    }
    componentDidMount()
    {
      Axios.get(`/api/lawyers/casesPage/${this.state.lawyerID}`)
      .then(res=>{this.setState({loading:true,allForms:res.data.data})})
      .catch(error=>this.setState({error:true}))
    }
    chooseForm = (id,F)=>{
      this.setState({companyId:id,idEntered:true})
    }
    render () {
      if (localStorage.getItem('language') === 'English') {
        return ( this.state.error? 
          <h1>process could not be complete</h1>
          :
          !this.state.idEntered?
          <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
          :
          <Form>
            <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
              Calculate Fees
            </Button>
          </Form>
        )
      }
      else{
        return (
          <Form>
            <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
              احسب التكاليف
            </Button>
          </Form>
        )
      }
    }
      clicked = e => {
        e.preventDefault()
        const {companyId} = this.props.match.params
        axios
            .get(`/api/lawyers/calculateFees/${companyId}`)
            .then(res => alert(`This company needs to pay ${res.data.company.fees}`))
            .catch(error => alert(error.response.message))
        } 
}

export default CalcFees
