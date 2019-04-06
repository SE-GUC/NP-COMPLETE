import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class CompanyItem extends Component {
    
  render () {
                     // const {title, status} = this.props.company
        return (
            <div>
              <h1>
              {this.props.com.name} <br/>
              </h1>
              <h3>{this.props.com.state}</h3>
            </div>
          ) 
  }
}

CompanyItem.propTypes = {
  com: PropTypes.object.isRequired
}

export default CompanyItem
