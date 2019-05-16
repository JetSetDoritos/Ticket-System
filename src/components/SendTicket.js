import React, {Component} from 'react';
import app from '../base'

class SendTicket extends Component {

    render(){

        return(
            <form onSubmit={this.pushData}>
            <label>
              Name:
            <input type="text" name="name" ref="name" required />
            </label>
            <br/>
             <label>
              Phone:
            <input type="text" name="phone" pattern="[0-9]{3}-[0-9]{4}" ref="phone" />
            </label>
            <br/>
            <label>
              Email:
            <input type="email" name="email" ref="email" />
            </label>
            <br/>
            <input type="submit" value="Submit" />
            </form>
        )

    }

    pushData = (event) => {
        event.preventDefault();
        var nextticket = 0;
        var newname = this.refs.name.value;
        var newphone = this.refs.phone.value;
        var newemail = this.refs.email.value;
        var newseller = app.auth().currentUser.email;
    
        app.database().ref("events").child("0").child("total/").once("value")
        .then(function(snapshot) {
      
    
        app.database().ref("events").child("0").child("tickets").child(snapshot.val()+1).set({
          name: newname,
          phone: newphone,
          email: newemail,
          seller: newseller,
          id: snapshot.val()+1,
          processed: "false"
        });
    
        app.database().ref("events").child("0").child("total").set(snapshot.val()+1);
    
        });
    
      }

}

export default SendTicket