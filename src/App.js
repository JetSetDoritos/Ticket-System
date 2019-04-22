import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from './Tabs';
import PropTypes from 'prop-types';
//import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
import Login from './components/Login';
import {BrowserRouter,Route} from 'react-router-dom';
import app from './base'
require('firebase/auth');



var data = require('./data/database.json');

  // Initialize Firebase

 

  /*
  // Get a reference to the database service
  var database = firebase.database();

   return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });*/

console.log(data);

var dataset = [];
var eventName = "";
var eventDate = "";
var eventTime = "";
var customTicket = false;

var isAdmin = false;


app.database().ref("total/").once("value")
    .then(function(snapshot) {
  

      for(var x = 1; x < snapshot.val()+1; x++){
        app.database().ref("tickets").child(x).once('value').then(function(snapshot2) {
          dataset.push({'id': snapshot2.val().id, 'name': snapshot2.val().name, 'hash': snapshot2.val().hash});
          // ...
        });
      }
    });

app.database().ref("event").once("value").then(function(snapshot){
  eventName = snapshot.val().name;
  eventDate = snapshot.val().date;
  eventTime = snapshot.val().time;
  customTicket = snapshot.val().custom;
  console.log(snapshot);
  });


console.log("Eventname " + eventName);


console.log(dataset);

app.database().ref("users").child("admins").once("value").then(function(snapshot){
  if(app.auth().currentUser)  
    if(snapshot.val().a1 == app.auth().currentUser.uid)
        isAdmin = true;

      console.log("is admin:");
      console.log(isAdmin);
});


const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'hash',
  text: 'Hash'
}];


const products = [{'id': '1', 'name': '2', 'price': '3'}]
console.log(products);

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          //loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          //loading: false
        })
      }
})
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Route exact path="/login" component={Login} />
        {this.state.authenticated
        ? null
        : <Link className="linker" to="/login">Login</Link>
        }
        <Tabs>
        <div label="Tickets">
          List of tickets
          {this.state.authenticated
          ? <BootstrapTable keyField='id' data={ dataset } columns={ columns }  />
          : null
          }
        </div>
        <div label="Send">
          Send Tickets
          <form onSubmit={this.pushData}>
            <label>
              Name:
            <input type="text" name="name" ref="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {isAdmin
        ? (
        <div label="Admin">
        <form onSubmit={this.ticketTemplate}>
            <label>
              Event Name:
            <input type="text" name="event name" ref="eventName" />
            </label>
            <br></br>
            <label>
              Event Time:
            <input type="text" name="event time" ref="eventTime" />
            </label>
            <br></br>
            <label>
              Event Date:
            <input type="text" name="name date" ref="eventDate" />
            </label>
            <br></br>
            <label>
              Custom Ticket:
              <input type="checkbox" name="custom ticket" ref="customTicket"/>
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>)
        :  (<div label="User"></div>)}
      </Tabs>
      
      </div>
      </BrowserRouter>
    );
  }

  pushData = (event) => {
    event.preventDefault();
    var nextticket = 0;
    var newname = this.refs.name.value;

    app.database().ref("total/").once("value")
    .then(function(snapshot) {
  

    app.database().ref("tickets").child(snapshot.val()+1).set({
      name: newname,
      id: snapshot.val()+1,
      processed: "false"
    });

    app.database().ref("total").set(snapshot.val()+1);

    });

  }

  ticketTemplate = (event) => {
    event.preventDefault();
    console.log("ticket template changed");
    if((eventName !== this.refs.eventName.value) && (this.refs.eventName.value != ""))
      app.database().ref("event").child("name").set(this.refs.eventName.value);
    if((eventTime !== this.refs.eventTime.value) && (this.refs.eventTime.value != ""))
      app.database().ref("event").child("time").set(this.refs.eventTime.value);
    if((eventDate !== this.refs.eventDate.value) && (this.refs.eventDate.value != ""))
      app.database().ref("event").child("date").set(this.refs.eventDate.value);
    if(customTicket !== this.refs.customTicket.checked)
      app.database().ref("event").child("custom").set(this.refs.customTicket.checked);
  }
  
}

export default App;
