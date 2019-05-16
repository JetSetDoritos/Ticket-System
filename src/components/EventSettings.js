import React, {Component} from 'react';
import app from '../base'


class EventSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : "",
            time : "",
            date : "",
            custom : false,
            value: ''
        };
    }
   
    

    componentWillMount(){
        var self = this;
        app.database().ref("events").child("0").child("event").once("value").then(function(snapshot){
            //eventDate = snapshot.val().date;
            //eventTime = snapshot.val().time;
            //customTicket = snapshot.val().custom;
            self.setState({
                title : snapshot.val().name,
                time : snapshot.val().time,
                date : snapshot.val().date,
                custom : snapshot.val().custom,
                value: ''
            })

            });
    }


    //<form onSubmit={this.ticketTemplate}>

    render(){
        
        return(
        <form>
            <label>
              Event Name:
            <input type="text" name="event name" ref="eventName" placeholder = {this.state.title} />
            </label>
            <br></br>
            <label>
              Event Time:
            <input type="text" name="event time" ref="eventTime" placeholder = {this.state.time}/>
            </label>
            <br></br>
            <label>
              Event Date:
            <input type="text" name="name date" ref="eventDate" placeholder = {this.state.date}/>
            </label>
            <br></br>
            <label>
              Custom Ticket:
              <input type="checkbox" name="custom ticket" ref="customTicket" checked = {this.state.custom}/>
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        )
    }

    
}

export default EventSettings