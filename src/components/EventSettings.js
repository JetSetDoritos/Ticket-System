import React, {Component} from 'react';
import app from '../base'


class EventSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : props.title,
            time : "",
            date : "",
            custom : false,
            value: ''
        };
    }
   
    

    componentDidMount(){
        var self = this;
        app.database().ref("events").child("0").child("event").once("value").then(function(snapshot){
            //eventName = snapshot.val().name;
            //eventDate = snapshot.val().date;
            //eventTime = snapshot.val().time;
            //customTicket = snapshot.val().custom;
            //console.log("eventDetails" + eventName);
            self.setState({
                title : snapshot.val().name,
                time : "",
                date : "",
                custom : false,
                value: ''
            })

            });
    }


    //<form onSubmit={this.ticketTemplate}>

    render(){

        console.log(this.title)
        
        return(
        <form>
            <label>
              Event Name:
            <input type="text" name="event name" ref="eventName" placeholder = {this.state.title} />
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
        )
    }

    
}

export default EventSettings