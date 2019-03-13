import sys
import os
import json
import hashlib


with open('database.json') as json_file:  
    data = json.load(json_file)

totals = 0
for p in data:
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