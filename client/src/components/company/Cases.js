import React, { Component } from 'react'
import CaseItem from './CaseItem'
class Cases extends Component {
  render () {
    return this.props.cases.map((current) => <CaseItem key={current._id} current={current} Choose={this.props.Choose} delCase={this.props.delCase} />)
  }
}

export default Cases
