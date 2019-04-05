import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      faqs: [{
        title: "Who is me ?",
          body: "Mohamed Yasser"
      },
      {
          title: "How is me ?",
          body: "Better than you :)"
      },
      {
          title: "How old is me ?",
          body: "20 and turning 21 in 2 months .. Wohoo .. *Birthday celebrating emoji*"
      },
      {
          title: "What the hell are these questions ?",
          body: "Dummy questions till we find some interesting FAQs *wink*"
      },
      {
          title: "IMPORTANT for you Reviewers !!",
          body: " Why does all the answers appear once i click on any of the 5 buttons ? \n This is an issue that i ( Yasser ) will fix in a while .. Thanks"
      }],
      collapse: false
    }
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <div className="container">
          <section className="section">
            <h1 className="title">FAQ</h1>

            <div className="columns">
              {this.state.faqs.map(faq => (
                <div>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{faq.title}</Button>
                <Collapse isOpen={this.state.collapse}>
                  <Card>
                    <CardBody>{faq.body}</CardBody>
                  </Card>
                </Collapse>
                <br></br>
              </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Faq;
