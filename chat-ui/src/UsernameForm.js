import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Typography, TextField, Button } from '@material-ui/core';
class UsernameForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.store = this.props.store
  }
  
  render() { 
    return ( 
      <>
      <Container component="main" fixed>
        <div style={{
          marginTop: '10%'
        }}>
          <Typography component="h1" variant="h5">
            Username
          </Typography>
          <form noValidate onSubmit={(e) => {
            this.store.setUserName(this.state.username)
            e.preventDefault()
          }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username} 
              onChange={(e) => {
                this.setState({username: e.target.value})
                e.preventDefault()
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entra
            </Button>
          </form>
        </div>
      </Container>
      </>
    )
  }
}
 
export default inject('store')(observer(UsernameForm))