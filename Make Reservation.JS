APP.JS

import "./App.css";
import Reservation from "./Reservation";
import { Navigation } from "./Navigation";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
      <h1>Group4 Residency</h1>
        <Navigation />

        <Switch>
          <Route path="/Reservation" component={Reservation} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;


RESERVATION.JS

import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddReservation} from './AddReservation';
import { EditReservation } from './EditReservation';


export class Reservation extends Component{

    constructor(props){
        super(props);
        this.state={Res:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Reservation')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Res:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {Res}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let EditModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                   
                    <tbody>
                    {Res.map(Res => <tr key={Res.Id}>
                        <td>{Res.Id}</td>
                        <td>{Res.Name}</td>
                        <td>{Res.Email}</td>
                        <td>{Res.PhoneNumber}</td>
                        <td>{Res.Address}</td>
                        <td>{Res.IdProof}</td>
                        <td>{Res.TotalAmount}</td>
                        <td>
                        <ButtonToolbar>
                            <Button className="mr-2" variant="info"
                            onClick={()=>this.setState({EditModalShow:true,
                                    Id:Res.Id,Name:Res.Name,Email:Res.Email,PhoneNumber:Res.PhoneNumber,Address:Res.Address,IdProof:Res.IdProof,TotalAmount:Res.TotalAmount})}>
                                    Edit 
                            </Button>
                        </ButtonToolbar>

                        </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Reservation </Button>

                    <AddReservation show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar> <br/>
                <ButtonToolbar>
                <Button variant='primary'
                    onClick={()=>this.setState({editModalShow:true})}>
                     Edit Reservation </Button>

                    <EditReservation show={this.state.editModalShow} 
                    onHide={EditModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}

export default Reservation;


ADD RESERVATION:

import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./Reservation.css";

export class AddReservation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:21112/api/Reservation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: event.target.ID.value,
        Name: event.target.Name.value,
        Email: event.target.Email.value,
        PhoneNumber: event.target.PhoneNumber.value,
        Address: event.target.Address.value,
        IdProof: event.target.IdProof.value,
        RoomType : event.target.RoomType.value,
        NoOfMembers: event.target.NoOfMembers.value,
        CheckIn :event.target.CheckIn.value,
        CheckOut : event.target.CheckOut.value,
        TotalAmount: event.target.TotalAmount.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          labelled="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Id">
                    <Form.Label>Id : </Form.Label>
                    <Form.Control
                      type="text"
                      name="ID"
                      required
                      placeholder="Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="Name">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      required
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="Email">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Email"
                      required
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group controlId="PhoneNumber">
                    <Form.Label>PhoneNumber : </Form.Label>
                    <Form.Control
                      type="text"
                      name="PhoneNumber"
                      required
                      placeholder="PhoneNumber"
                    />
                  </Form.Group>
                  <Form.Group controlId="Address">
                    <Form.Label>Address : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      required
                      placeholder="Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="IdProof">
                    <Form.Label>IdProof : </Form.Label>
                    <Form.Control
                      type="text"
                      name="IdProof"
                      required
                      placeholder="IdProof"
                    />
                  </Form.Group>
                  <Form.Group controlId="RoomType">
                    <Form.Label>RoomType : </Form.Label>
                    <Form.Control
                      type="text"
                      name="RoomType"
                      required
                      placeholder="RoomType"
                    />
                  </Form.Group>
                  <Form.Group controlId="NoOfMembers">
                    <Form.Label>No.Of Members : </Form.Label>
                    <Form.Control
                      type="text"
                      name="NoOfMembers"
                      required
                      placeholder="NoOfMembers"
                    />
                  </Form.Group>
                  <Form.Group controlId="CheckIn">
                    <Form.Label>CheckIn : </Form.Label>
                    <Form.Control
                      type="date"
                      name="CheckIn"
                      required
                      placeholder="CheckIn"
                    />
                  </Form.Group>
                  <Form.Group controlId="CheckOut">
                    <Form.Label>CheckOut : </Form.Label>
                    <Form.Control
                      type="date"
                      name="CheckOut"
                      required
                      placeholder="CheckOut"
                    />
                  </Form.Group>
                  <Form.Group controlId="TotalAmount">
                    <Form.Label>TotalAmount : </Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalAmount"
                      required
                      placeholder="TotalAmount"
                    />
                  </Form.Group>


                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}



EDIT RESERVATION:-


import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditReservation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  
  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:21112/api/Reservation", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: event.target.Id.value,
        Name: event.target.Name.value,
        Email: event.target.Email.value,
        PhoneNumber: event.target.PhoneNumber.value,
        Address: event.target.Address.value,
        IdProof: event.target.IdProof.value,
        RoomType : event.target.RoomType.value,
        NoOfMembers: event.target.NoOfMembers.value,
        CheckIn :event.target.CheckIn.value,
        CheckOut : event.target.CheckOut.value,
        TotalAmount: event.target.TotalAmount.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  render() {
    return (

      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          labelled="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Id">
                    <Form.Label>Id : </Form.Label>
                    <Form.Control
                      type="text"
                      name="ID"
                      required
                      placeholder="Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="Name">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      required
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="Email">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Email"
                      required
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group controlId="PhoneNumber">
                    <Form.Label>PhoneNumber : </Form.Label>
                    <Form.Control
                      type="text"
                      name="PhoneNumber"
                      required
                      placeholder="PhoneNumber"
                    />
                  </Form.Group>
                  <Form.Group controlId="Address">
                    <Form.Label>Address : </Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      required
                      placeholder="Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="IdProof">
                    <Form.Label>IdProof : </Form.Label>
                    <Form.Control
                      type="text"
                      name="IdProof"
                      required
                      placeholder="IdProof"
                    />
                  </Form.Group>
                  <Form.Group controlId="RoomType">
                    <Form.Label>RoomType : </Form.Label>
                    <Form.Control
                      type="text"
                      name="RoomType"
                      required
                      placeholder="RoomType"
                    />
                  </Form.Group>
                  <Form.Group controlId="NoOfMembers">
                    <Form.Label>No.Of Members : </Form.Label>
                    <Form.Control
                      type="text"
                      name="NoOfMembers"
                      required
                      placeholder="NoOfMembers"
                    />
                  </Form.Group>
                  <Form.Group controlId="CheckIn">
                    <Form.Label>CheckIn : </Form.Label>
                    <Form.Control
                      type="date"
                      name="CheckIn"
                      required
                      placeholder="CheckIn"
                    />
                  </Form.Group>
                  <Form.Group controlId="CheckOut">
                    <Form.Label>CheckOut : </Form.Label>
                    <Form.Control
                      type="date"
                      name="CheckOut"
                      required
                      placeholder="CheckOut"
                    />
                  </Form.Group>
                  <Form.Group controlId="TotalAmount">
                    <Form.Label>TotalAmount : </Form.Label>
                    <Form.Control
                      type="text"
                      name="TotalAmount"
                      required
                      placeholder="TotalAmount"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                   
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditReservation;


NAVIGATION.JS

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
               
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Reservation">
                    Reservation
                </NavLink>

                </Nav>
            
            </Navbar>
        )
    }
}

RESERVATION.CSS

body{
    background-image:url("./IMAGE.jpeg");
    height:auto;
    width:auto;
}
input[type=text], select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing:initial;
    margin-top: 6px;
    margin-bottom:10px;
}


