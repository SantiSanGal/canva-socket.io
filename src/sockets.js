const { Socket } = require("socket.io");

module.exports = io => {

    //almacena las lineas hechas
    var line_history = [];

    io.on('connection', socket =>{
        console.log('new User Connected');

        for(let i in line_history){
            socket.emit('draw_line', {line: line_history[i]});
        }

        socket.on('draw_line', data =>{
            line_history.push(data.line);
            io.emit('draw_line', data);
        });
    })
}