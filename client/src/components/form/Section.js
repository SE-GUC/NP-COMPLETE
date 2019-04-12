import React, {Component} from 'react'
import DropDown from './DropDown'
import TextField from './TextField'
import Container from 'react-bootstrap/Container'

class Section extends Component {
    constructor(props){
        super(props)
        this.state = {
            number: props.number,
            sectionName: props.section.sectionName,
            fields: props.section.fields
        }
    }

    render(){
        return(
            this.state.fields.map( (fields, i) => {

                if(fields.fieldType === 'dropdownList'){
                   return <DropDown fields={fields} />
                } else if(fields.fieldType === 'textField') {
                   return  <TextField fields={fields} />
                }
            })
        )
    }
}

export default Section