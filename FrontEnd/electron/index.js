document.onkeydown = updateKey;
document.onkeyup = resetKey;
document.onmouseup = resetKey;

var server_port = 65432;
var server_addr = "10.0.0.207";   // the IP address of your Raspberry PI

function client(input){
    
    const net = require('net');
    //var input = document.getElementById("message").value;
    console.log(input)

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("bluetooth").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}

// for detecting which key is been pressed w,a,s,d
function updateKey(e) {
    console.log("here")
    console.log(e)

    e = e || window.event;

    if (e.keyCode == '87') {
        // up (w)
        document.getElementById("upArrow").style.borderBottom = "50px solid green";
        //send_data("87");
        client('w')
    }
    else if (e.keyCode == '83') {
        // down (s)
        document.getElementById("downArrow").style.borderTop = "50px solid green";
        //send_data("83");
        client('s')
    }
    else if (e.keyCode == '65') {
        // left (a)
        document.getElementById("leftArrow").style.borderRight = "50px solid green";
        //send_data("65");
        client('a')
    }
    else if (e.keyCode == '68') {
        // right (d)
        document.getElementById("rightArrow").style.borderLeft = "50px solid green";
        //send_data("68");
        client('d')
    }
    else if (e.keyCode == '73') {
        // head up (i)
        document.getElementById("tiltUpArrow").style.borderBottom = "50px solid green";
        //send_data("68");
        client('i')
    }
    else if (e.keyCode == '75') {
        // head down (k)
        document.getElementById("tiltDownArrow").style.borderTop = "50px solid green";
        //send_data("68");
        client('k')
    }
    else if (e.keyCode == '74') {
        // head left (j)
        document.getElementById("panLeftArrow").style.borderRight = "50px solid green";
        //send_data("68");
        client('j')
    }
    else if (e.keyCode == '76') {
        // head right (l)
        document.getElementById("panRightArrow").style.borderLeft = "50px solid green";
        //send_data("68");
        client('l')
    }
}

// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.borderBottom = "50px solid grey";
    document.getElementById("downArrow").style.borderTop = "50px solid grey";
    document.getElementById("leftArrow").style.borderRight = "50px solid grey";
    document.getElementById("rightArrow").style.borderLeft = "50px solid grey";
    document.getElementById("tiltUpArrow").style.borderBottom = "50px solid grey";
    document.getElementById("tiltDownArrow").style.borderTop = "50px solid grey";
    document.getElementById("panLeftArrow").style.borderRight = "50px solid grey";
    document.getElementById("panRightArrow").style.borderLeft = "50px solid grey";
}


// update data for every 50ms
function update_data(){
    setInterval(function(){
        // get image from python server
        client();
    }, 50);
}
