const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type Point = { x: number; y: number }

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
  size: number
}

io.on('connection', (socket) => {
  socket.on('client-ready', () => {
    socket.broadcast.emit('get-canvas-state')
  })

  socket.on('canvas-state', (state) => {
    console.log('received canvas state')
    socket.broadcast.emit('canvas-state-from-server', state)
  })

  socket.on('draw-line', ({ prevPoint, currentPoint, color,size}: DrawLine) => {
    socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color,size })
  })

  socket.on('clear', () => io.emit('clear'))
})

server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})
