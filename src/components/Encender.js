import React from 'react';
import socketIOClient from "socket.io-client";


const socket = socketIOClient('wss://le-18262636.bitzonte.com', {
            path: '/stocks'
            });

export class Encender extends React.Component {
    state = {
        s: false
    }


    onClick = () => {

        if(this.state.s == false){
            this.state.s = true;
            console.log('Encendiendo socket');
            socket.on("UPDATE", (data) => {
            console.log(data);
            });
        }
        else{
            this.state.s = false;
            console.log('Apagando socket');
            socket.close();
        }
    }
    render()
  {
        return (
           <button onClick={this.onClick}
                className="btn"> </button>
        )
    }
}




const estado = false;

export default Encender;