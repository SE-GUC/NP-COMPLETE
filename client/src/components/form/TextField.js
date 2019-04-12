import React, {Component} from 'react'
import { Col, FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap';

class TextField extends Component {
    constructor(props){
        super(props)
        this.state = {
            fieldName: props.fields.fieldName,
            required: props.fields.required,
            inputType: props.fields.inputType,       
            validations: props.fields.validations,
            validate: '',
            errorMessage: ''
        }
        this.validate = this.validate.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    validate(e) {
        if(!this.state.validations)
            return
        const min = this.state.validations[0].min
        if(Number(e) < min){
            this.setState.validate = 'danger'
            this.setState.errorMessage = `Minimum amount is ${min}`
        } else {
            this.setState.validate = 'success'
            this.setState.errorMessage = ''
        }
        console.log(`e: ${e}, type of e ${typeof e} min: ${this.state.validations[0].min}, state: ${this.setState.validate}, errorM: ${this.setState.errorMessage}`)
        // validations.map((x) => {
        //     switch(Object.keys(x)[0]) {
        //         case 'min':
        //             if(e < x.Object.keys(x)[0]){
        //                 this.setState.validate = 'danger'; 
        //                 this.setState.errorMessage = `Minimum amount is ${x.Object.keys(x)[0]}`;
        //                 break;
        //             }
        //         case 'max': 
        //             if(e < x.Object.keys(x)[0]){
        //                 this.setState.validate = 'safe'; 
        //                 this.setState.errorMessage = `Maximum amount is ${x.Object.keys(x)[0]}`; 
        //                 break;
        //             }
        //     }

        // })
    }

    // handleChange = async (event) => {
    //     const { target } = event;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const { name } = target;
    //     await this.setState({
    //       [ name ]: value,
    //     });
    // }

    render(){
        return(
            <FormGroup row> 
                <Label for={this.state.fieldName} sm={2}> {this.state.fieldName} </Label>
                <Col sm={10}>
                    <Input type={this.state.inputType} 
                        name={this.state.fieldName} 
                        id={this.state.fieldName} 
                        placeholder={this.state.fieldName} 
                        valid={ this.state.validate === 'success' }
                        invalid={ this.state.validate === 'danger' }
                        onChange= {e => {
                            const { target } = e;
                            const value = target.type === 'checkbox' ? target.checked : target.value;
                            this.validate(value)
                            console.log(this.valid)
                        }}
                    />
                    <FormFeedback valid>
                        All good!
                    </FormFeedback>
                    <FormFeedback>
                        {`Uh Oh! ${this.state.errorMessage}`}
                    </FormFeedback>
                    <FormText>This is most likely your {this.state.fieldName}.</FormText>
                </Col>
          </FormGroup>
            
        )
    }
}

export default TextField