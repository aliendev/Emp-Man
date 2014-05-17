#!/usr/bin/env python

import sys, json, cgi, time
import cgitb, os, json, pprint, common

# CGI Return stuff
cgitb.enable()

print "Content-Type: application/json\n\n"

form = cgi.FieldStorage()

result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
result['keys'] = ",".join(form.keys())
data = {}
for k in form.keys():
	data[k] = form.getvalue(k)
result['data'] = data
result['datatwo'] = ''
jsonData = json.dumps(result)



#parse data and make variables 
importfname = data['fname[]'][1]
importlname = data['lname[]'][1]
importhired = data['hired[]'][1]
importcreated = data['created[]'][1]
importjobStatus = data['jobStatus[]'][1]
importdepartment = data['department[]'][1]
importposition = data['position[]'][1]
importexp = data['exp[]'][1]
importswipeid = data['swipeid[]'][1]
importphoneExt = data['phoneExt[]'][1]
importrepTag = data['repTag[]'][1]
importvmpass = data['vmpass[]'][1]
importcompNumber = data['compNumber[]'][1]
importnetid = data['netid[]'][1]
importnetPass = data['netPass[]'][1]
importemailid = data['emailid[]'][1]
importemailPass = data['emailPass[]'][1]
importemailAddress = data['emailAddress[]'][1]
importpandionid = data['pandionid[]'][1]
importpandionpass = data['pandionpass[]'][1]
importos = data['os[]'][1]
importnotes = data['notes[]'][1]


# get data into db

def dbInsertDeptExists(dept):
	#sql = """INSERT INTO empman.departments (deptName) VALUES ('%s') WHERE NOT EXISTS (SELECT deptName FROM empman.departments)""" % (dept)
	sql = """INSERT IGNORE INTO `departments` SET `deptName` = '%s'""" % dept
	common.dbExecuteSql(sql)
	return 'done son'

def dbInsertEmpExists():
	sql = """INSERT IGNORE INTO `employees` SET """
	sql += """`empfname` = '%s', """ % importfname
	sql += """`emplname` = '%s', """ % importlname
	sql += """`hired` = '%s', """ % importhired
	sql += """`created` = '%s', """ % importcreated
	sql += """`jobStatus` = '%s', """ % importjobStatus
	sql += """`swipid` = %s, """ % importswipeid
	sql += """`phoneext` = %s, """ % importphoneExt
	sql += """`reptag` = '%s', """ % importrepTag
	sql += """`vmpass` = %s, """ % importvmpass
	sql += """`companynumber` = '%s', """ % importcompNumber
	sql += """`netid` = '%s', """ % importnetid
	sql += """`netpass` = '%s', """ % importnetPass
	sql += """`emailid` = '%s', """ % importemailid
	sql += """`emailpass` = '%s', """ % importemailPass
	sql += """`emailaddress` = '%s', """ % importemailAddress
	sql += """`pandionid` = '%s', """ % importpandionid
	sql += """`pandionpass` = '%s', """ % importpandionpass
	sql += """`notes` = '%s'""" % importnotes
	common.dbExecuteSql(sql)
	return 'done son'



#call functions to put everything together
dbInsertDeptExists(importdepartment)
#time.sleep(2)
dbInsertEmpExists()


# INSERT INTO `employees` 
# (empfname, emplname, swipid, phoneext, reptag, vmpass, companynumber, netid, netpass, emailid, emailpass, emailadress, pandionid, pandionpass, notes) 
# VALUES ('Jacquie', 'Voss', '12345', '2225', 'YM225', '1234', '(425) 203-3900', 'jvoss', 'x10m1ch83ly', 'jacquiev', 'x10m1ch83ly', 'jacquiev@example.com', 
# 	'jacquie.voss@sku.example.com', 'vossj', 'o')



print jsonData
