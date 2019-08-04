This project was created using React, Firebase, and Java.  Ticket System (name subject to change) is a simple ticketing system for small to medium sized events.  The React web app lists all tickets for an event, allowes you to send new tickets, manage ticket design, and scan/redeem tickets.  The ticket is sent in the form of a QR code to either the customers email or phone via MMS.  The QR codes represent the [EventID] + [Ticket Sequence] + [hash of ticket information + random data] to ensure no two tickets are the same.

The database and web app were hosted on Firebase, while the Java component monitored the database and sent tickets that were added.

This project is under passive development, many features still require being implemented.  The java component is not currenty published.


## Screeenshots

Example of tickets

<img src="../readme-hosting/images/example-custom.png?raw=true" width="200"> ||||| <img src="../readme-hosting/images/example-standard.png?raw=true" width="200">

Ticket List

<img src="../readme-hosting/images/list.png?raw=true" width="800">

Selecting a ticket from list

<img src="../readme-hosting/images/metadata.png?raw=true" width="600">

Manage information for generating standard ticket (only available to admin users, hidden from basic seller users)

<img src="../readme-hosting/images/admin.png?raw=true" width="300">

Scanning a ticket, its status is displayed and it can be marked as redeemed

<img src="../readme-hosting/images/scan.png?raw=true" width="650">

Sending a ticket

<img src="../readme-hosting/images/send.png?raw=true" width="300">

Login field

<img src="../readme-hosting/images/login.png?raw=true" width="600">
