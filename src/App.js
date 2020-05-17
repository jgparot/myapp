import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import SpanningTable from './components/Table3';
import About from "./components/About";
import socketIOClient from "socket.io-client";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import {Card} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Modal from "react-bootstrap/Modal";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    AreaChart,
} from 'recharts';






const socket = socketIOClient('wss://le-18262636.bitzonte.com', {
            path: '/stocks'
            });

class App extends React.Component {
    state = { socket: socketIOClient('wss://le-18262636.bitzonte.com', {
            path: '/stocks'
            }),
        s: false,
        first: true,
    todos: [{id: 1,
      title: "Take out",
    completed: false},
    {id: 2,
      title: "AA Take out",
    completed: false},
        {id: 3,
      title: "BB Take out",
    completed: false}
    ],
        show: false,
        acciones_prueba:{},
        current_stock: {},
        acciones_instante: {},
        current_min: {},
        stocks: {},
        anterior: {},
        vender: {},
        total: {},
        comprar: {},
        total_2: 0,
        valor_graf: {},
        nuevo: [],
        nombres_acciones: [],
        mkt: {},
        nombres_aux:[],
        mkt_max: 0,
        mkts_max: {},
        st_prueba: {},
        mkt_prueba: {},
        acciones_completo:{},
        s_m: false,
        car_mkt:"",
    }

    handleClose = () =>{
       this.setState({show: false})
    }

    handleShow = (data) => {
        this.setState({s_m: data})
       this.setState({show: true})
    }


    onClick = () => {

        if(this.state.s === false) {
            //this.state.s = true;
            this.setState({s: true})
            if (this.state.first === true) {
                console.log('Encendiendo socket');
                this.state.socket.connect();
                this.setState({first: false})
            }
            else{

                this.state.socket.connect();
            console.log('Encendiendo socket 2')
        }
            this.state.socket.on("UPDATE", (data) => {
                console.log(data)
            //console.log(this.state.comprar['AAPL'], this.state.vender['AAPL']);
            if (data['ticker'] in this.state.acciones_instante) {
                this.state.valor_graf[data['ticker']].push({name: data['time'],value: data['value']})

                //this.setState({valor_graf: this.state.valor_graf});
                var t = new Date(data['time']* 1000);
                var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
                this.state.acciones_prueba[data['ticker']] = [...Object.values(this.state.acciones_prueba[data['ticker']]), {
                value: data['value'],
                name: formatted,
                ticker: data['ticker']}];
                this.setState({acciones_prueba: this.state.acciones_prueba});

                if (data['value'] > this.state.current_stock[data['ticker']]) {
                    this.state.acciones_instante[data['ticker']] = [{
                        name: data['ticker'],
                        value: data['value'],
                        max: data['value'],
                        min: this.state.current_min[data['ticker']],
                        total: this.state.comprar[data['ticker']] + this.state.vender[data['ticker']],
                        time: data['time'],
                        cambio: (((data['value'] - this.state.anterior[data['ticker']])/this.state.anterior[data['ticker']])*100).toFixed(2)
                    }];
                    this.setState({acciones_instante: this.state.acciones_instante});
                    this.state.current_stock[data['ticker']] = data['value'];
                    this.state.anterior[data['ticker']] = data['value'];
                    this.setState({current_stock: this.state.current_stock});
                    this.setState({anterior: this.state.anterior});
                    this.refreshTableData()
                }

                else if (data['value'] < this.state.current_min[data['ticker']]) {
                    this.state.acciones_instante[data['ticker']] = [{
                        total: this.state.comprar[data['ticker']] + this.state.vender[data['ticker']],
                        name: data['ticker'],
                        time: data['time'],
                        value: data['value'],
                        max: this.state.current_stock[data['ticker']],
                        min: data['value'],
                        cambio: (((data['value'] - this.state.anterior[data['ticker']])/this.state.anterior[data['ticker']])*100).toFixed(2)
                    }];
                    this.setState({acciones_instante: this.state.acciones_instante});
                    this.state.current_min[data['ticker']] = data['value'];
                    this.state.anterior[data['ticker']] = data['value']
                    this.setState({current_min: this.state.current_min});
                    this.setState({anterior: this.state.anterior});
                }

                else {
                    this.state.acciones_instante[data['ticker']] = [{
                        total: this.state.comprar[data['ticker']] + this.state.vender[data['ticker']],
                        name: data['ticker'],
                        time: data['time'],
                        value: data['value'],
                        max: this.state.current_stock[data['ticker']],
                        min: this.state.current_min[data['ticker']],
                        cambio: (((data['value'] - this.state.anterior[data['ticker']])/this.state.anterior[data['ticker']])*100).toFixed(2)
                    }];
                    this.setState({acciones_instante: this.state.acciones_instante});
                    this.state.anterior[data['ticker']] = data['value']
                    this.setState({anterior: this.state.anterior});
                }
            }
            ////
            //// Cuando no está dentro de los conocidos.
            else {
                this.setState({nombres_acciones:[this.state.nombres_acciones, data['ticker']]})
                var t = new Date(data['time'] * 1000);
                var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
                this.state.acciones_prueba[data['ticker']] = [ {
                value: data['value'],
                name:  formatted,
                ticker: data['ticker']}];
                this.setState({acciones_prueba: this.state.acciones_prueba});




                this.state.valor_graf[data['ticker']] = [{name: data['time'],value: data['value']}]
                this.setState({valor_graf: this.state.valor_graf})
                this.state.acciones_instante[data['ticker']] = [{
                    total: this.state.comprar[data['ticker']] + this.state.vender[data['ticker']],
                    name: data['ticker'],
                        time: data['time'],
                        value: data['value'],
                        max: data['value'],
                        min: data['value'],
                        cambio: 0}];
                this.setState({acciones_instante: this.state.acciones_instante})
                this.state.current_stock[data['ticker']] = data['value'];
                this.state.current_min[data['ticker']] = data['value'];
                this.state.anterior[data['ticker']] = data['value'];
                 this.setState({current_stock: this.state.current_stock});
                    this.setState({anterior: this.state.anterior});
                    this.setState({current_min: this.state.current_min});
            }
            let m = {};
            Object.values(this.state.stocks).forEach(element => {m[element['company_name']] =  element.ticker;
            this.state.acciones_completo[element['ticker']] = {nombre: element['company_name'], pais: element['country']}});


            Object.values(this.state.mkt).forEach(primera =>
            primera.listed_companies.forEach((element) => {
            if (Object.keys(m).includes(element)) {

                if (primera['total'] === undefined) {
                    if (this.state.vender[m[element]] === undefined && this.state.comprar[m[element]] === undefined) {
                        primera['total'] = 0
                    }
                     else if (this.state.comprar[m[element]] === undefined) {
                        primera['total'] = this.state.vender[m[element]];
                        this.setState({mkt_max: this.state.mkt_max +=  primera['total']});
                    }
                    else if (this.state.vender[m[element]] === undefined) {
                        primera['total'] = this.state.comprar[m[element]];
                        this.setState({mkt_max: this.state.mkt_max +=  primera['total']});
                    }
                    else{
                         primera['total'] = this.state.vender[m[element]] + this.state.comprar[m[element]]
                        this.setState({mkt_max: this.state.mkt_max +=  primera['total']});
                    }
                } else {
                    if (this.state.vender[m[element]] === undefined && this.state.comprar[m[element]] === undefined) {
                        primera['total'] += 0
                    } else if (this.state.comprar[m[element]] === undefined) {
                        primera['total'] += this.state.vender[m[element]];
                        this.setState({mkt_max: this.state.mkt_max +=  this.state.vender[m[element]]});
                    }
                    else if (this.state.vender[m[element]] === undefined) {
                        primera['total'] += this.state.comprar[m[element]];
                        this.setState({mkt_max: this.state.mkt_max +=  this.state.comprar[m[element]]});
                    }
                    else{
                         primera['total'] += this.state.vender[m[element]] + this.state.comprar[m[element]];
                         this.setState({mkt_max: this.state.mkt_max +=  this.state.comprar[m[element]]+ this.state.vender[m[element]]});
                    }
                }

                //Prueba tabla nueva

                   if (this.state.mkt_prueba[primera['name']] === undefined){
                    this.state.mkt_prueba[primera['name']] = {}
                }



                   if (this.state.mkt_prueba[primera['name']][m[element]] === undefined ){

                       if (this.state.vender[m[element]] === undefined && this.state.comprar[m[element]] === undefined) {
                            this.state.mkt_prueba[primera['name']][m[element]] = {desc: m[element], qty:0, unit: 0, price:0, mkt: primera['exchange_ticker']};
                    } else if (this.state.comprar[m[element]] === undefined) {
                        this.state.mkt_prueba[primera['name']][m[element]] = {desc: m[element], qty:this.state.vender[m[element]], unit: 0, price: this.state.vender[m[element]], mkt: primera['exchange_ticker']};
                    }
                    else if (this.state.vender[m[element]] === undefined) {
                        this.state.mkt_prueba[primera['name']][m[element]] = {desc: m[element], qty:0, unit: this.state.comprar[m[element]], price:this.state.comprar[m[element]], mkt: primera['exchange_ticker']};
                    }
                    else{
                        this.state.mkt_prueba[primera['name']][m[element]] = {desc: m[element], qty:this.state.vender[m[element]], unit: this.state.comprar[m[element]], price:this.state.comprar[m[element]]+ this.state.vender[m[element]], mkt: primera['exchange_ticker']};
                    }

                   }
                   else {
                       if (this.state.vender[m[element]] === undefined && this.state.comprar[m[element]] === undefined) {
                           console.log("")
                   }else if (this.state.comprar[m[element]] === undefined) {
                        this.state.mkt_prueba[primera['name']][m[element]].qty += this.state.vender[m[element]];
                        this.state.mkt_prueba[primera['name']][m[element]].price += this.state.vender[m[element]]}
                    else if (this.state.vender[m[element]] === undefined) {
                        this.state.mkt_prueba[primera['name']][m[element]].unit += this.state.comprar[m[element]];
                        this.state.mkt_prueba[primera['name']][m[element]].price += this.state.comprar[m[element]]                    }
                    else{
                        this.state.mkt_prueba[primera['name']][m[element]].qty += this.state.vender[m[element]];
                        this.state.mkt_prueba[primera['name']][m[element]].unit += this.state.comprar[m[element]];
                        this.state.mkt_prueba[primera['name']][m[element]].price += this.state.comprar[m[element]]  + this.state.vender[m[element]]                 }
                   }


                   this.setState({mkt_prueba: this.state.mkt_prueba})

                //PAra el volumen de venta y compra



            }}))
            //Object.values(this.state.stocks)
            });
            this.state.socket.on("BUY", (data2) => {
                //console.log(this.state.vender)
                if (data2['ticker'] in this.state.vender) {
                    //this.state.total += data2['volume']
                    this.state.vender[data2['ticker']] +=
                        //volume: data2['volume'],
                       // time: data2['time'],
                         data2['volume'];
                        this.setState({vender: this.state.vender})

                }
                else {
                    this.state.vender[data2['ticker']] =
                       // volume: data2['volume'],
                        //time: data2['time'],
                         data2['volume'];

                    //this.state.total += data2['volume']
                    this.setState({vender: this.state.vender})
                }
            });
            this.state.socket.on("SELL", (data3) => {
                //console.log(this.state.comprar)
                if (data3['ticker'] in this.state.comprar) {
                    //this.state.total_2 += data3['volume']
                    this.state.comprar[data3['ticker']] +=
                          data3['volume'];
                        this.setState({comprar: this.state.comprar})

                    }
                    else {
                        this.state.comprar[data3['ticker']] = data3['volume'];
                        this.setState({comprar: this.state.comprar})

                    }

            });
            this.state.socket.emit('EXCHANGES');
            this.state.socket.on('EXCHANGES', (data) => {
                    this.setState({mkt: data})

            });
            this.state.socket.emit('STOCKS');
            this.state.socket.on('STOCKS', (data) => {
                    this.setState({stocks: data});

            });




        }
        else{
            //this.state.s = false;
            this.setState({s: false})
            console.log('Apagando socket');
            this.state.socket.disconnect();
        }
        //this.state.mkt.key.forEach
    }


    refreshTableData = () => this.setState({refreshTableData: !this.state.refreshTableData})

    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map(todo => {
          if(todo.id === id){todo.completed = !todo.completed}
        return todo;
        }) });
}

    delTodo = (id) => {
      this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]});
    }

    addTodo = (title) => {
      const newTodo = {id: 4,
      title: title,
      completed: false}
      this.setState({ todos: [...this.state.todos, newTodo]})
    }


  render()
    {
        return (
            <Router>
                <div className="App">
                    <Header onClick={this.onClick} data={this.state.s}/>
                  <div className="container">

                  <Route exact path="/" render={props => (
                    <React.Fragment>

                    </React.Fragment>
                  )}/>
                      <Route path="/about" component={About} data={this.state.mkt_prueba}/>
                  </div>

                    <Container>
                        <br>
                    </br>
                        <Row>
                            <Col  sm={6}>
                        <Carousel bg="dark">
                    {Object.values(this.state.acciones_prueba).map((acion) =>




                                  <Carousel.Item>
                                      <Card style={{ width: '32rem', height: '24rem'}} border={'secondary'}>
                            <Card.Body>
                            <Card.Title>{acion[0].ticker}</Card.Title>
                                <Card.Text>
                                 <React.Fragment>
                        <AreaChart
                        width={400}
                        height={200}
                        data={acion}
                        margin={{
                          top: 10, right: 30, left: 0, bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#DB2A15" fill="#FA9B87" />
                     </AreaChart>
                    </React.Fragment>
                                </Card.Text>
                            </Card.Body>
                              <Card.Body>
                                <Card.Text>
                                  Variación del precio de la acción de {acion[0].ticker} en el tiempo.
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  <small className="text-muted"> - </small>
                                </Card.Footer>
                            </Card>
                                  </Carousel.Item>

                          )}
                            </Carousel>
                            </Col>
                        <Col>
                               <Card style={{ width: '32rem', height: '24rem'}} border={'secondary'}>
                            <Card.Body>
                            <Card.Title>Acciones Bursátiles</Card.Title>
                                   {/*<Table1 data={this.state.acciones_instante} refresh={this.refreshTableData} />*/}
                                   <MDBTable scrollY maxHeight="277px">
                                        {Object.values(this.state.acciones_instante).length !== 0 &&
                            <Table striped bordered hover size="sm">
                          <thead>

                          { ['U$', 'value', 'max', 'min', 'Vol. Total','cambio'].map((key, index) =>
                              <th  key={index}> <p>{key.toUpperCase()}</p> </th>
                          )}
                          </thead>
                                <tbody>
                                {Object.values(this.state.acciones_instante).map((students, index) =>

                   <React.Fragment>

                   <tr key={index}>
                       <td><h5><Button variant="outline-danger" size="sm" onClick={() => this.handleShow(students[0].name)} >{students[0].name} </Button> </h5></td>
                       <td>{students[0].value}</td>
                      <td>{students[0].max}</td>
                      <td>{students[0].min}</td>
                       <td>{students[0].total}</td>
                       {students[0].cambio >= 0 &&
                       <td style={{ color: 'green'}} >+{students[0].cambio}%</td>}
                       {students[0].cambio < 0 &&
                       <td style={{ color: 'red'}} >{students[0].cambio}%</td>}

                   </tr>
                                </React.Fragment>) }
                          </tbody>
                        </Table>
                             }
                                 </MDBTable>



                               </Card.Body>
                                <Card.Footer>
                                  <small className="text-muted">Last update 1 second ago</small>
                                </Card.Footer>
                            </Card>

                        </Col>
                      </Row>
                        <br>
                        </br>
                        <Row>
                            <Col><h2>Mercados Bursátiles</h2></Col>
                            <br>
                            </br>
                        </Row>
                        <Row>



                                {Object.values(this.state.mkt_prueba).length !== 0 &&
                    <Col>

                    <Carousel disabled>
                    {Object.values(this.state.mkt_prueba).map((market) => (
                        <Carousel.Item>
                         <Card   border={'secondary'}>
                          <Card.Body>
                            <Card.Title>{Object.values(market)[0].mkt}</Card.Title>
                              <SpanningTable data={Object.values(market)} total={this.state.mkt_max}/>

                          </Card.Body>
                             <Card.Body>
                           <Card.Title>{this.state.mkt[Object.values(market)[0].mkt].name}</Card.Title>
                                <Card.Text>
                                  Mercado ubicado en {this.state.mkt[Object.values(market)[0].mkt].address}, {this.state.mkt[Object.values(market)[0].mkt].country}.
                                </Card.Text>
                              </Card.Body>
                          <Card.Footer className="text-muted">Last update 1 second ago</Card.Footer>
                        </Card>
                        </Carousel.Item>

                          ))}
                            </Carousel>
                                </Col>}

                        </Row>


                    </Container>
                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                        <Modal.Header closeButton>
                          <Modal.Title>{this.state.s_m}</Modal.Title>
                        </Modal.Header>
                            {(this.state.acciones_completo)[this.state.s_m] !== undefined &&
                            <Modal.Body><h3>Nombre Empresa:  {this.state.acciones_completo[this.state.s_m].nombre}</h3>
                                <h3> País:  {this.state.acciones_completo[this.state.s_m].pais}</h3>
                            </Modal.Body>}

                            {Object.values(this.state.acciones_completo).length ===0 &&
                        <Modal.Body>No hay datos
                            </Modal.Body>}
                        <Modal.Footer>
                          <Button variant="secondary" onClick={this.handleClose}>
                            Close
                          </Button>

                        </Modal.Footer>
                      </Modal>

                        <Row><Col><br></br></Col></Row>
                      </div>

            </Router>

        );
    }
}

export default App;


