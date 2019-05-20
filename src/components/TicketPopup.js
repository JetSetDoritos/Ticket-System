import React, {Component} from 'react';
import app from '../base'
import Popup from 'reactjs-popup'

class TicketPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            hash: props.hash,
            seller: props.seller,
            email: props.email,
            phone: props.phone,
            id: props.id,
            redeemed: "true"
        };
    }
    
    render(){
        return(
        <Popup trigger={<button className="button"> Options </button>} modal>
        {close => (
          <div className="modal">
            

            <div className="header"> Ticket Options </div>
            <div className="content">
              {' '}
              <b>Hash: </b> {this.props.hash}
              <br />
              <b>ID: </b> {this.props.id}
              <br />
              <b>Name: </b> {this.props.name}
              <br />
              <b>Email: </b> {this.props.email}
              <br />
              <b>Phone: </b> {this.props.phone}
              <br />
              <b>Seller: </b> {this.props.seller}
              <br />
              <b>Redeemed: </b> {this.props.redeemed
              ? "Ticket has been redeemed."
              : "Ticket has not been redeemed."
              }
              <br/>
            </div>
            <div className="actions">
              <button
                className="resend email button"
                onClick={() => {
                  console.log('modal closed ')
                  close()
                }}
              >
                Resend Email
              </button>
              <button
                className="button"
                onClick={() => {
                  console.log('modal closed ')
                  close()
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
        )
    }
}

export default TicketPopup