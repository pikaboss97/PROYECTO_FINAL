module.exports = function (io) {

    let nicknames = [];
    io.on('connection', socket => {
        console.log('new user connected');

        socket.on('new user', (data, cb) => {
            //if (nicknames.indexOf(data) != -1) {
               // cb(false);
           // }else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);

            //}
        });

        socket.on('send message', data => {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });

        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            let nv = nicknames.indexOf(socket.nickname);
            nicknames.splice(nv, 1);
            socket.emit('desconectado', nv);
            
        })
    })

}