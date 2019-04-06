import React, { Component } from 'react'
import Qa from './Qa'

class Faq extends Component {
  constructor (props) {
    super(props)

    this.state = {
      faqs: [{
        title: 'Who is me ?',
        body: 'Mohamed Yasser'
      },
      {
        title: 'How is me ?',
        body: 'Better than you :)'
      },
      {
        title: 'How old is me ?',
        body: '20 and turning 21 in 2 months .. Wohoo .. *Birthday celebrating emoji*'
      },
      {
        title: 'What the hell are these questions ?',
        body: 'Dummy questions till we find some interesting FAQs *wink*'
      }]
    }
  }

  render () {
    return (
      <div>
        <div className='container'>
          <section className='section'>
            <h1 className='title'>FAQ</h1>

            <div className='columns'>
              {this.state.faqs.map(faq => (
                <div>
                  <Qa title={faq.title} body={faq.body} />
                  <br />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Faq
