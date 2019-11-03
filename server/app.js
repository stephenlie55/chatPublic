require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const fs = require('fs')

server.listen(port, function() {
    console.log('Socket server running on port: ', port)
})

io.on('connection', function(socket) {
    socket.emit('info', 'Please enjoy the apps!')
    socket.emit('getMessages', JSON.parse(fs.readFileSync('./db.json', 'utf8')))

    socket.on('newClient', function(agent, user) {
        console.log(`${user} from ${agent} connected to webSocket`)
    })

    socket.on('sendMessage', function(message) {
        let messages = JSON.parse(fs.readFileSync('./db.json', 'utf8'))
        messages.unshift(message)
        fs.writeFileSync('./db.json', JSON.stringify(messages))
        io.emit('getMessages', JSON.parse(fs.readFileSync('./db.json', 'utf8')))
    })

    socket.on('logout', function(agent, user) {
        console.log(`${user} from ${agent} disconnected from webSocket`)
    })
})
