import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import {Button} from "react-bootstrap";
import {ButtonGroup}from 'react-bootstrap';

function Header(props) {


    return(
        <React.Fragment>
       <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="./components/layouts/stock-mkt.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Mercado Financiero
    </Navbar.Brand>

           <ButtonGroup aria-label="Basic example">
                {props.data !== true &&
            <Button onClick={props.onClick}
                variant="outline-danger"> Actualizar</Button>}
                {props.data === true &&
            <Button onClick={props.onClick}
                variant="outline-danger" disabled>Actualizar</Button>}
                {props.data === true &&
            <Button onClick={props.onClick}
                variant="outline-danger">Detener</Button>}
                {props.data !== true &&
            <Button onClick={props.onClick}
                variant="outline-danger" disabled> Detener</Button>}
</ButtonGroup>

  </Navbar>
        <br>
        </br>
        </React.Fragment>
    )
}

const headerStyle = {
    background: '#333',
    color: ' #fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: ' #fff',
    textDecoration: 'none'
}

export default Header;