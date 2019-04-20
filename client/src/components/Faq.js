import React, { Component } from 'react'
import Qa from './Qa'

class Faq extends Component {
  constructor (props) {
    super(props)

    this.state = (localStorage.getItem('language') === 'English') ? {

      faqs: [
        {
          title: 'What is the process to establish a company?',
          body: 'Either you apply for a form online or through the walk-in proccess in GAFI premises, after filling the form it will be reviewed by the establishment lawyer and the reviewer after that you will be promoted to pay the fees then the admin will be able to publish your company.'
        },
        {
          title: 'How can i know how much to pay for establishing a company?',
          body: 'The Lawyer calculates it for you and then informs you.'
        }]
    } : {
      faqs: [
        {
          title: 'ما هي الاجرائات لانشاء شركة ؟',
          body: 'اما ان تملئ استمارة عبر الموقع او تشرفنا في مقر جافي وبعد ملئ الاستمارة سيقوم محامي التأسيس والمراجع بمراجعتها وبعد ذلك سيتم اخطارك لدفع الرسوم المستحقة وبعد ذلك سوف يكون المسئول قادرا علي تأسيس الشركة'
        },
        {
          title: 'كيف يمكنني ان اعرف المبلغ المستحق لتأسيس شركة ؟',
          body: 'سيقوم المحامي بحسابه لك ويبلغك به'
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
