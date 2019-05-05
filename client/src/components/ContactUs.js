import React, { Component } from 'react'
import {Header} from 'semantic-ui-react'

export class ContactUs extends Component {
  render () {
    if (localStorage.getItem('language') === 'English') {
      return (
        <div >
          <Header inverted as='h1'>GOT QUESTIONS? You can contact us through:</Header>
          <Header inverted as='h2'>Email: <strong>gafiweb2019@gmail.com</strong></Header>
          <Header inverted as='h2'>PHONE: <strong>+202 240 55 452</strong></Header>
          <Header inverted as='h2'>Fax: <strong>+202 240 55 425</strong></Header>
          <Header inverted as='h2'>Hotline: <strong>16035</strong></Header>
          <Header inverted as='h1'>Or visit us at: <strong>No. 3, Salah Salem st., Nasr City, Cairo, 11562, Egypt.</strong></Header>

        </div>
      )
    } else{
      return (
        <div>
          <Header inverted as='h1'>لديك  أسئلة ؟ يمكنك التواصل معنا عن طريق</Header>
          <Header inverted as='h2'><strong> gafiweb2019@gmail.com </strong> : البريد الالكتروني</Header>
          <Header inverted as='h2'><strong> +202 240 55 452 </strong> : هاتف</Header>
          <Header inverted as='h2'><strong> +202 240 55 425 </strong> : فاكس</Header>
          <Header inverted as='h2'><strong> 16035 </strong>: الخط الساخن</Header>
          <Header inverted as='h2'> أو يمكنك زيارتنا في المقر الرئيسي :   <strong> رقم 3, شارع صلاح سالم , مدينة نصر, القاهرة, 11562 مصر </strong> </Header>

        </div>
      )
    }
  }
}

export default ContactUs
