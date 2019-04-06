import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Qa extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    
        this.state = {
          title:props.title,
          body:props.body,
          collapse: false
        }
      }

      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }
      
  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={{ marginBottom: "1rem" }}>{this.state.title}</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>{this.state.body}</CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Qa;
