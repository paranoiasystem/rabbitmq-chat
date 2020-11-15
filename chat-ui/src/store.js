import { types } from "mobx-state-tree"

const ws = new WebSocket('ws://localhost:3005/chat')

ws.onopen = () => {
  console.log('connected')
}

ws.onclose = () => {
  console.log('disconnected')
}

ws.onmessage = e => {
  store.onReceiveMessage(JSON.parse(e.data))
}

const Message = types.model({
  user: types.string,
  message: types.string,
  date: types.Date
})

const Store = types.model({
  currentUser: types.maybeNull(types.string, null),
  messages: types.optional(types.array(Message), [])
}).actions(self => ({
  setUserName (user) {
    self.currentUser = user
  },
  sendMessage(message) {
    const temp = {
      type: 'message',
      user: self.currentUser,
      message: message,
      date: (new Date()).getTime()
    }
    ws.send(JSON.stringify(temp))
  },
  onReceiveMessage(message) {
    self.messages.push(message)
  }
}))

const store = Store.create({
  currentUser: null
})

export { store }