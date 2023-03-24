function init (){
    let mouse = {
        click: false,
        move: false,
        position: {x: 0, y: 0},
        position_prev: false
    };

    //canvas
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const socket = io();

    canvas.addEventListener('mousedown', (e) =>{
        mouse.click = true;
    });

    canvas.addEventListener('mouseup', (e) =>{
        mouse.click = false;
    });

    canvas.addEventListener('mousemove', (e) =>{
        mouse.position.x = e.clientX / width;
        mouse.position.y = e.clientY / height;
        mouse.move = true;
        // console.log(mouse);
    });

    socket.on('draw_line', data => {
        const line = data.line;
        context.beginPath();
        context.lineWith = 2;
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });

    function mainLoop(){
        if(mouse.click && mouse.move && mouse.position_prev){
            socket.emit('draw_line', {line:[mouse.position, mouse.position_prev]})
            mouse.move = false;
        }
        mouse.position_prev = {x: mouse.position.x, y: mouse.position.y}
        setTimeout(mainLoop, 25);
    }
    mainLoop();
}

document.addEventListener('DOMContentLoaded', init);