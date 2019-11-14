const bidSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A client connected')
        socket.emit('hello', 'NKH')
        socket.on("bidmoney", data => {
            console.log(JSON.stringify(data, 0, 2))
        })
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    })
}

module.exports = {
    bidSocket
}