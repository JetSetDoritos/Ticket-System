import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Tabs from './Tabs';
import PropTypes from 'prop-types';


var data = require('./data/database.json');

console.log(data);

var dataset = [];
var datasize = 0;
var dummy;
for(dummy in data){
  datasize++;
}
for (var x = 1; x < datasize+1; x++){
  console.log(x)
  dataset.push({'id': data[x.toString()].id, 'name': data[x.toString()].name, 'hash': data[x.toString()].hash});
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
        <div label="Gator">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="Croc">
          After &apos;while, <em>Crocodile</em>!
          <BootstrapTable keyField='id' data={ dataset } columns={ columns }  />
        </div>
        <div label="Sarcosuchus">
          Nothing to see here, this tab is <em>extinct</em>!
        </div>
      </Tabs>





      </div>
    );
  }
}

export default App;
