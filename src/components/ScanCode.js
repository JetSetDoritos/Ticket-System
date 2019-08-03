import React, {Component} from 'react';
import QrReader from 'react-qr-reader'
import app from '../base'

class ScanCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: 'No Result',
            displayName: '',
            displayID: '',
            scanID: '',
            scanHash: '',
            scanName: ''
        };
    }

    handleScan = data => {
        if (data) {

          var self = this;
          var returnString,returnName,returnID = ""
          var getID, getHash,getName = ""

          app.database().ref("events").child("0").child("total/").once("value")
      .then(function(snapshot) {
          var tempDataset = []
  
  
        app.database().ref("events").child("0").child("tickets").once('value').then(function(snapshot2) {
          for(var x = 1; x < snapshot.val()+1; x++){
              if(snapshot2.child(x).val().hash == data){
                getID = snapshot2.child(x).val().id
                getHash = snapshot2.child(x).val().hash
                getName = snapshot2.child(x).val().name
                if(!snapshot2.child(x).val().redeemed){
                  returnString = 'Ticket had not been used.'
                }
                else{
                  returnString = '!Ticket has been used!'
                }
                returnName = 'Ticket Owner: ' + getName
                returnID = 'Ticket ID: ' + getID

              }
          }// ...
  
          self.setState({
              result: returnString,
              displayName: returnName,
              displayID: returnID,
              scanID: getID,
              scanHash: getHash,
              scanName: getName
          })
        }); 
      });

        }
      }
      handleError = err => {
        console.error(err)
      }


      render() {
        return (
          <div>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
            {this.state.result} <div/>
            {this.state.displayName} <div/>
            {this.state.displayID} <div/>
            {this.state.scanID !== ''
            ? ( <button onClick={this.consumeTicket}>
              Redeem Ticket
            </button>)
            : ''
            }

          </div>
        )}

        consumeTicket = (event) => {
          event.preventDefault();
      
          app.database().ref("events").child("0").child("tickets")
          .child(this.state.scanID).child("redeemed").set(true);
      
          var tempState = this.state
          tempState.result = "Ticket is now redeemed!"
          this.setState(tempState)
        }
}

export default ScanCode