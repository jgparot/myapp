import SpanningTable from "./Table3";
import Col from "react-bootstrap/Col";
import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import Row from "react-bootstrap/Row";

<Col>{Object.values(this.state.mkt_prueba).length !== 0 &&
                <div>
                    {Object.values(this.state.mkt_prueba).map((market) => (
                        <div>
                            <h1>MArket Name</h1>
                    <SpanningTable data={Object.values(market)} total={this.state.mkt_max}/>
                        </div>
                    ))}
                    </div>
                    }</Col>




<Row>
                            <div className="container">
                              <CardGroup>
                                {Object.values(this.state.acciones_prueba).map((acion) =>




                                 <Card style={{ width: '50rem' }}>
                                <Card.Body>
                                  <Card.Title><h3>{acion[0].ticker}</h3></Card.Title>
                                   <AreaChart
                                                    width={350}
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
                                </Card.Body>
                                <Card.Footer>
                                  <small className="text-muted">Last updated 1 second ago</small>
                                </Card.Footer>
                              </Card>
                                    )}
                            </CardGroup>
                            </div>

                        </Row>



<Col  sm={8}>
                                {Object.values(this.state.acciones_prueba).map((acion) =>

                            <Card style={{ width: '30rem' }}>
                            <Card.Body>
                            <Card.Title>{acion[0].ticker}</Card.Title>
                                 <React.Fragment>
                        <AreaChart
                        width={350}
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
                            </Card.Body>
                                <Card.Footer>
                                  <small className="text-muted">Last updated 1 second ago</small>
                                </Card.Footer>
                            </Card>
                        )}
                            </Col>