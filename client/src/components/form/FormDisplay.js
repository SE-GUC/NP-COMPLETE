import React, { Component } from 'react'
import FormItem from './FormItem'
import '../../App.css'

class FormDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.form
        }
    }

    render() {
      return (
        this.state.data.map( (field, i) => (
            <FormItem name={"field " + i } value={field} />
        ))
      );
    }
}

export default FormDisplay