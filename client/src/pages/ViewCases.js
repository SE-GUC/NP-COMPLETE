import React, { Component } from 'react'
import Cases from '../components/company/Cases'

import Axios from 'axios';

class ViewCases extends Component {

  constructor(props) {
    super(props)
    this.state={
      cases:[],
      error:false,
      loading:true
    }
  }
  Choose = (id)=>{
   this.setState( 
     { cases : this.state.cases.map( current => {
        if(current._id===id) {
          var s=''
          current.choice=!current.choice
          for (var key in current) {
            if (current.hasOwnProperty(key)) {
               s+=(key + " -> " + current[key]);
            }
        }
        // current.name=s
         alert(s) 
        }
        return current
     }) })
  }
  delCase= (id)=> {
    this.setState( 
      { cases:[...this.state.cases.filter((current)=>current._id!==id)]
      })
  }
  componentDidMount() {

    Axios
      .get('http://localhost:8000/api/companies')
      .then(res=> this.setState({cases:res.data.data,loading:false}))
      .catch(error=> this.ERROR.bind(error))
    }
  
  render () {
    return this.state.error? <h1>process could not be completed</h1>:this.state.loading?
    <h1>loading please be patient</h1>
    :
    ( <div className='Admin'>
        <Cases cases = {this.state.cases} Choose={this.Choose} delCase={this.delCase}/>
      </div>
    )
  }
  ERROR = (error)=>{
    console.log(error)
    this.setState({error:true})
  }
}

export default ViewCases