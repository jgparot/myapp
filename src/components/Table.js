import React, { Component, useState } from 'react'
import { MDBScrollspyBox, MDBScrollspyList, MDBScrollspyListItem, MDBScrollspyText, MDBTabContent } from "mdbreact";
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

class Table1 extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { show: false,//state is by default an object
         students: [

            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ],
          abc: Object.values(this.props.data)
      }
   }

    handleClose = () =>{
       this.setState({show: false})
    }

    handleShow = () => {
       this.setState({show: true})
    }


   componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.abc);
       }

   renderTableHeader() {
     // console.log(this.props.data )
       if (isEmpty(this.props.data)) {
           return null
       }
       else{
           //console.log(Object.values(this.props.data)[0][0])
          //let header = Object.keys(Object.values(this.props.data)[0][0]);
           let header = ['', 'value', 'max', 'min', 'Vol. Total',,'cambio']
           return header.map((key, index) => {
               return <th key={index}>{key.toUpperCase()}</th>
           })
       }
   }
   refreshTableData = res => this.setState({ abc: res.data.abc });

   renderTableData() {
       if (isEmpty(this.props.data))
       {
          return null
       }
   else
       {
          //return this.state.students.map((students, index) => {
           return Object.values(this.props.data).map((students, index) => {
               const {name, total, value, max, min, cambio} = students[0] //destructuring
               return (
                   <tr key={index}>
                       <td><h5>{name}  </h5></td>
                       <td>{total}</td>
                       <td>{value}</td>
                      <td>{max}</td>
                      <td>{min}</td>
                       {cambio >= 0 &&
                       <td style={{ color: 'green'}} >+{cambio}%</td>}
                       {cambio < 0 &&
                       <td style={{ color: 'red'}} >{cambio}%</td>}

                   </tr>
               )
           })
       }
   }
   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
          <React.Fragment>

            <Table striped bordered hover size="sm">
              <thead>

                 {this.renderTableHeader()}

              </thead>
              <tbody>
                   {this.renderTableData()}


              </tbody>
            </Table>

              <Button variant="primary" onClick={this.handleShow}>
        Launch demo modal
      </Button>

      <Modal show={this.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


          </React.Fragment>
      )
   }
}

export default Table1