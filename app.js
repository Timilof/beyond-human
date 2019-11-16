const express = require('express');

const app = express()
.set('views', 'views')
  .use(express.static('app/src'))


const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1200;
const fs = require('fs');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/views/chat.html');
});
app.get('/shop', function(req, res) {
  res.sendFile(__dirname + '/views/shop.html');
});
app.get('/guidance', function(req, res) {
  res.sendFile(__dirname + '/views/guidance.html');
});


io.on('connection', function(socket){

let shunList = [];

socket.on('warning', function(){
io.emit('warning')
})
// normal message handler
socket.on('chat message', function(msg){
    io.emit('chat message', {substance:msg, shun:shunList});
  })
// delete message handler
socket.on('deleter', function(ids){
    io.emit('deleter', ids);
  })
// shunning handler
socket.on('shunner', function(xoUser){
    shunList.push(xoUser)
    console.log(shunList)
    console.log(xoUser)
    io.emit('shunner', {xo:xoUser, list:shunList});
  })

});



http.listen((process.env.PORT || 1200), () => console.log(`Example app listening on port ${port}!`))
