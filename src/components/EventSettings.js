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
        <form onSubmit={this.ticketTemplate}>
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
              <input type="checkbox" name="custom ticket" ref="customTicket" checked = {this.state.custom} onChange = {this.flipState} />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        )
    }

    flipState = (event) => {
        var self = this
        var tempState = self.state
        tempState.custom = !this.refs.checked
        self.setState(tempState)
    }

    ticketTemplate = (event) => {
        var self = this;
        var tempState = self.state;
        
        event.preventDefault();
        console.log("ticket template changed");
        if((this.state.title !== this.refs.eventName.value) && (this.refs.eventName.value != "")){
          app.database().ref("events").child("0").child("event").child("name").set(this.refs.eventName.value);
          tempState.title = this.refs.eventName.value
          this.refs.eventName.value = ""
        }
        if((this.state.time !== this.refs.eventTime.value) && (this.refs.eventTime.value != "")){
          app.database().ref("events").child("0").child("event").child("time").set(this.refs.eventTime.value);
          tempState.time = this.refs.eventTime.value
          this.refs.eventTime.value = ""
        }
        if((this.state.date !== this.refs.eventDate.value) && (this.refs.eventDate.value != "")){
          app.database().ref("events").child("0").child("event").child("date").set(this.refs.eventDate.value);
          tempState.date = this.refs.eventDate.value
          this.refs.eventDate = ""
        }
        if(this.state.custom !== this.refs.customTicket.checked){
          app.database().ref("events").child("0").child("event").child("custom").set(this.refs.customTicket.checked);
          tempState.custom = this.refs.customTicket.checked
        }

        self.setState(tempState)
        }
    
}

export default EventSettings