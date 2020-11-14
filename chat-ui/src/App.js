import React from 'react'
import { inject, observer } from 'mobx-react'
import UsernameForm from './UsernameForm'
import Chat from './Chat'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  
  render() { 
    return ( 
      (this.store.currentUser) ? <Chat /> : <UsernameForm />
    )
  }
}
 
export default inject('store')(observer(App))