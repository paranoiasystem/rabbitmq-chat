import React from 'react'
import { inject, observer } from 'mobx-react'

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
        <form onSubmit={(e) => {
          this.store.setUserName(this.state.username)
          e.preventDefault()
        }}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={(e) => {
              this.setState({username: e.target.value})
              e.preventDefault()
            }}/>
          </label>
          <input type="submit" value="Vai" />
        </form>
      </>
    )
  }
}
 
export default inject('store')(observer(UsernameForm))