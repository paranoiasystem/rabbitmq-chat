'use strict'

const fp = require('fastify-plugin')
const amqp = require('amqplib')
const { v4: uuidv4 } = require('uuid')

module.exports = fp(async (fastify, opts) => {

  const conn = await amqp.connect('amqp://rabbitmq:rabbitmq@rabbitmq/')
  const pubChannel = await conn.createChannel()
  const subChannel = await conn.createChannel()
  let subs = {}

  await subChannel.assertExchange('chat', 'fanout', {
    durable: false
  })

  const handle = async (conn) => {
    conn.id = uuidv4()
    const queue = await subChannel.assertQueue('', {
      exclusive: true
    })
    await subChannel.bindQueue(queue.queue, 'chat', '')
    subChannel.consume(queue.queue, function (msg) {
      if (msg && msg.content) {
        conn.socket.send(msg.content.toString())
      }
    }, {
      noAck: true
    })

    subs[conn.id] = {
      queue: queue.queue
    }

    conn.socket.on('message', message => {
      let tempMessage = JSON.parse(message)
      switch(tempMessage.type) {
        case 'message':
          try {
            delete tempMessage.type
            const msg = Buffer.from(JSON.stringify(tempMessage))
            pubChannel.publish('chat', '', msg)
          } catch (e) {
            console.error(`Errore: ${JSON.stringify(e)}`)
          }
          break
      }
    })

    conn.socket.on('close', async message => {
      const sub = subs[conn.id];
      if(sub){
          await subChannel.unbindQueue(sub.queue.queue, 'chat', '');
          await subChannel.deleteQueue(sub.queue.queue);                
      } 
    })
  }

  fastify.register(require('fastify-websocket'), {
    handle,
    options: {
      maxPayload: 1048576,
      path: '/chat'
    }
  })
})