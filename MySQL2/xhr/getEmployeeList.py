#!/usr/bin/env python
import json, cgi, cgitb, MySQLdb

#CGI Return stuff
cgitb.enable()
print "Content-Type: application/json\n\n"
form = cgi.FieldStorage()

data = []
i = 0

query = ('reptag', 'empfname', 'emplname', 'emailAddress')
sql = """SELECT `%s`, `%s`, `%s`, `%s` FROM `employees` ORDER BY `empfname`""" % query
conn = MySQLdb.connect (host = "localhost",
                   user = "empman",
                   passwd = "8l13n3mpm8n",
                   db = "empman")

cursor = conn.cursor()
cursor.execute(sql)
record = cursor.fetchall()
cursor.close()
conn.close()

for row in record:
	emp = {}
	emp[row[0]] = {}
	emp[row[0]][query[1]] = row[1]
	emp[row[0]][query[2]] = row[2]
	emp[row[0]][query[3]] = row[3]

	data.append(emp)


# make the browser happy
jsonData = json.dumps(data) 
print jsonData







