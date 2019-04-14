import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck'
export class MyNotifications extends Component {
    constructor (props) {
        super(props)
        this.state = {
          notifications: []
        }
      }
      componentDidMount () {
        const {id} = this.props
        axios
          .get(`http://localhost:8000/api/investors/notifications/${id}`)
          .then(res => this.setState({notifications: res.data.data}))
          .catch(err => {
            return this.setState({ error: err })
          })
      }
  render() {
    return (
      
        this.state.notifications.map(notification => {
        return <CardDeck>
        <Card>
          <Card.Body>
              <Card.Text>
                  {notification}
              </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      })
    )
  }
}

export default MyNotifications
