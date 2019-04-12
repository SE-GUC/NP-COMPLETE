import React, {Component} from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class DropDown extends Component {
    constructor(props){
        super(props)
        this.state = {
            fieldName: props.fields.fieldName,
            dropdownOptions: props.fields.dropdownOptions,
            required: props.fields.required
        }
    }

    render(){
        const renderOptions = this.state.dropdownOptions.map(option => {
           return <option> {option} </option>
        })
        return(

            <FormGroup row>
                <Label for={this.state.fieldName} sm={2}> {this.state.fieldName} </Label>
                <Col sm={10}>
                    <Input type="select" name={this.state.fieldName} id={this.state.fieldName}>
                        {renderOptions}
                    </Input>
                </Col>
            </FormGroup>
            
            // <div>
            //     <h1> {this.state.fieldName} </h1>
            //     <h1> {this.state.required} </h1>
            //     { this.state.dropdownOptions( (option) => (
            //         <h1> {option}</h1>
            //     )) }
            // </div>
        )
    }
}

export default DropDown