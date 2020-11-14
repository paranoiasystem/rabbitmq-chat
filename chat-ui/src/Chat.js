import React from 'react'
import { inject, observer } from 'mobx-react'

class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.store = this.props.store
  }

  render() { 
    return (
      <>
        <form onSubmit={(e) => {
          this.store.sendMessage(this.state.message)
          this.setState({message: ''})
          e.preventDefault()
        }}>
          <label>
            Messaggio:
            <input type="text" name="message" value={this.state.message} onChange={(e) => {
              this.setState({message: e.target.value})
              e.preventDefault()
            }}/>
          </label>
          <input type="submit" value="Invia" />
        </form>
        {
          this.store.messages.map(message => 
            <p key={message.date}>
              <b style={{color: 'green'}}>{message.user} - {(new Date(message.date)).toLocaleString()}:</b> {message.message}
            </p>
          )
        }
      </>
    )
  }
}
 
export default inject('store')(observer(Chat))