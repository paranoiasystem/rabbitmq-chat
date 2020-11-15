import React from 'react'
import { inject, observer } from 'mobx-react'
import { Box, Container, TextField } from '@material-ui/core'

class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.store = this.props.store
    this.messagesEnd = null
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() { 
    return (
      <>
        <Container component="div" style={{
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }}>
          <Box style={{
            height: '90%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflowY: 'auto',
            padding: '2%'
          }}>
            {
              this.store.messages.map(message => 
                <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: (this.store.currentUser === message.user) ? 'flex-end' : 'flex-start'
                }}>
                  <div key={message.date} style={{
                    background: '#e0e0e0',
                    border: '0.5px solid rgb(206, 206, 206)',
                    borderRadius: '10px',
                    margin: '2px',
                    padding: '10px',
                    display: 'inline-block'
                  }}>
                    <b>{message.user}:</b>{message.message}
                  </div>
                </div>
              )
            }
            <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
          </Box>
          <Box style={{
            height: '10%',
            width: '100%',
            position: 'absolute',
            left: 0,
            bottom: '2%'
          }}>
            <form style={{
              padding: '1%'
            }} onSubmit={(e) => {
              this.store.sendMessage(this.state.message)
              this.setState({message: ''})
              e.preventDefault()
            }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="message"
                label="Messaggio"
                name="message"
                autoFocus
                value={this.state.message} 
                onChange={(e) => {
                  this.setState({message: e.target.value})
                  e.preventDefault()
                }}
              />
            </form>
          </Box>
        </Container>
      </>
    )
  }
}
 
export default inject('store')(observer(Chat))