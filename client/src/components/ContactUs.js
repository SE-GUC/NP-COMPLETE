import React, { Component } from 'react'

export class ContactUs extends Component {


  render() {
    if(localStorage.getItem('language') === 'English'){
    return (
      <div>
        <h2>GOT QUESTIONS?</h2>
        <p>The easiest thing to do is to contact us on the following email<strong>gafiweb2019@gmail.com</strong></p>
      </div>
    )
    }else{
        return (
            <div>
              <h2>لديك أسالة ؟</h2>
              <p><strong>gafiweb2019@gmail.com</strong> يمكنك التواصل معنا عن طريق البريد الالكتروني</p>
            </div>
          )
    }
  }
}

export default ContactUs
