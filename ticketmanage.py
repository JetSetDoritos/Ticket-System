import sys
import os
import json
import hashlib
from firebase import Firebase


config = {
    "apiKey": "AIzaSyBKTvYuchVUVMBETWFvRsO56eP_7yIWqCs",
    "authDomain": "ticket-system-d1de5.firebaseapp.com",
    "databaseURL": "https://ticket-system-d1de5.firebaseio.com",
    "projectId": "ticket-system-d1de5",
    "storageBucket": "ticket-system-d1de5.appspot.com",
    "messagingSenderId": "441428437256"
}
firebase = Firebase(config)

db = firebase.database()

with open('database.json') as json_file:  
    data = json.load(json_file)

totals = 0
ticketcount = db.get()
for p in ticketcount.each():
    totals = totals+1

print(totals)

def sell():
    global totals
    currentname = input('Buyer Name: ')
    t = hashlib.sha256()
    t.update(str(totals).encode())
    t.update(currentname.encode())
    t.update(data[str(totals-1)]['hash'].encode())
    totals = totals+1
    data[str(totals)]= {
        'id': totals,
        'name': currentname,
        'hash': t.hexdigest()
    }
    with open('database.json', 'w') as outfile:  
        json.dump(data, outfile)
    return "ticket saved!"

def sell2():
    tickets = db.get()
    temptotal = 0
    for p in tickets.each():
        temptotal = temptotal + 1
    if(temptotal != totals):
        for x in range(totals,temptotal):
            name = db.child(x).child("name").val()
            t = hashlib.sha256()
            t.update(str(temptotal).encode())
            t.update(str(name).encode())
            temphash = t.hexdigest()
            db.child(x).update({"hash": str(temphash)})
 
def one():
    return "one"
 
def two():
    return "two"


#hash_object = hashlib.sha256(b'Hello World')
#hex_dig = hash_object.hexdigest()
#print(hex_dig)
 
inputselect = {
        'sell': sell,
        1: one,
        2: two
    }

#def inputselect(pathway):
#    func = switcher.get(pathway, "error")
#    return func()


while True:
    option = input("Option: ")
    inputselect[option]()