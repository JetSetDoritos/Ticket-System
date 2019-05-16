import React, {Component} from 'react';
import app from '../base'
import BootstrapTable from 'react-bootstrap-table-next';
import TicketPopup from './TicketPopup'



const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'hash',
    text: 'Hash'
  }, {
      dataField: 'seller',
      text: 'Seller'
  },{
      dataField: 'options',
      text: 'Options'
  }];

class TicketsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataset : [],
            value: ''
        };
    }

    
    
    componentWillMount(){
        var self = this;

        app.database().ref("events").child("0").child("total/").once("value")
    .then(function(snapshot) {
        var tempDataset = []


      app.database().ref("events").child("0").child("tickets").once('value').then(function(snapshot2) {
        for(var x = 1; x < snapshot.val()+1; x++){
        tempDataset.push({'id': snapshot2.child(x).val().id,
         'name': snapshot2.child(x).val().name,
          'hash': snapshot2.child(x).val().hash,
          'seller': snapshot2.child(x).val().seller,
         'options': <TicketPopup 
                id = {x}
                name={snapshot2.child(x).val().name}
                hash = {snapshot2.child(x).val().hash}
                seller={snapshot2.child(x).val().seller}
                phone={snapshot2.child(x).val().phone}
                email={snapshot2.child(x).val().email}
                />});
        }// ...

        self.setState({
            dataset : tempDataset,
            value : ''
        })
      });


    });


    }

    render(){
        return(
            <BootstrapTable keyField='id' data={ this.state.dataset } columns={ columns }  />
        )
    }
}

export default TicketsList