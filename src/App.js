import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from './Tabs';
import PropTypes from 'prop-types';
import firebase from "firebase";



var data = require('./data/database.json');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKTvYuchVUVMBETWFvRsO56eP_7yIWqCs",
    authDomain: "ticket-system-d1de5.firebaseapp.com",
    databaseURL: "https://ticket-system-d1de5.firebaseio.com",
    projectId: "ticket-system-d1de5",
    storageBucket: "ticket-system-d1de5.appspot.com",
    messagingSenderId: "441428437256"
  };
  firebase.initializeApp(config);

  /*
  // Get a reference to the database service
  var database = firebase.database();

   return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });*/

console.log(data);

var dataset = [];
var datasize = 8;
var dummy;
/*for(dummy in data){
  datasize++;
}
for (var x = 1; x < datasize+1; x++){
  console.log(x)
  dataset.push({'id': data[x.toString()].id, 'name': data[x.toString()].name, 'hash': data[x.toString()].hash});
}*/

for(var x = 1; x < datasize+1; x++){
  firebase.database().ref(x).once('value').then(function(snapshot) {
    dataset.push({'id': snapshot.val().id, 'name': snapshot.val().name, 'hash': snapshot.val().hash});
    // ...
  });
}

console.log(dataset);



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
  
  render() {
    return (
      <div className="App">
        
        <Tabs>
        <div label="Tickets">
          List of tickets
          <BootstrapTable keyField='id' data={ dataset } columns={ columns }  />
        </div>
        <div label="Send">
          Send Tickets
          <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
        </div>
        <div label="Admin">
          to be added
        </div>
      </Tabs>





      </div>
    );
  }
}

export default App;
