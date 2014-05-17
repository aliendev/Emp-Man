#!/usr/bin/env python
import json, cgi, cgitb, common

# CGI Return stuff
cgitb.enable()
print "Content-Type: application/json\n\n"
form = cgi.FieldStorage()
result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
result['keys'] = ",".join(form.keys())
jsonData = json.dumps(result) 

#call functions to put everything together
common.dbDeleteAllInfo()

# make the browser happy
print jsonData
