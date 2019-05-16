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
import ReactDom from 'react-dom';
import app from './base'
import EventSettings from './components/EventSettings'
import TicketsList from './components/TicketsList';
import SendTicket from './components/SendTicket'
import Popup from 'reactjs-popup'
import ScanCode from './components/ScanCode'
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

var isAdmin = true;


app.database().ref("events").child("0").child("users").child("admins").once("value").then(function(snapshot){
  if(app.auth().currentUser)  
    if(snapshot.val().a1 == app.auth().currentUser.uid)
        isAdmin = true;

      console.log("is admin:");
      console.log(isAdmin);
});



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
          <center>
          List of tickets
          {this.state.authenticated
          ? <TicketsList/>
          : null
          }
          </center>
        </div>
        <div label="Send">
          Send Tickets
          <SendTicket/>
        </div>
        {isAdmin
        ? (
        <div label="Admin">
          <EventSettings/>
        </div>)
        :  (<div label="User"></div>)}
        <div label="Scan">
        Scan
        <ScanCode/>
        </div>
      </Tabs>      
      </div>
      </BrowserRouter>
    );
  }

  


  
}

export default App;
