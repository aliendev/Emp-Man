#!/usr/bin/env python
import json, cgi, cgitb, common, csv, MySQLdb, ybEmail

#Variables used for settings (you can change these) 
dataDir = "/srv/www/emp-man.aliendev.com/public_html/data/"
bkupFile = dataDir+"exportAllDataBackup.csv"
csvFile = dataDir+"exportAllData.csv"
jsonFile = dataDir+"exportAllData.js"
xmlFile = dataDir+"exportAllData.xml"


# CGI Return stuff
cgitb.enable()
print "Content-Type: application/json\n\n"
form = cgi.FieldStorage()
result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
result['keys'] = ",".join(form.keys())
jsonData = json.dumps(result) 
data = {} # this is the important part for the rest of the program
for k in form.keys():
    data[k] = form.getvalue(k)

sql = """SELECT * FROM `employees`"""
dbData = common.dbFetchAll(sql)
dbArray = []


emailSendTo = data['exportAllEmailAddress']
emailSender = "system@emp-man.aliendev.com"
emailSubject = 'Emp-Man Export Results'

if data['exportAllDataLocation'] == 'backupLocally':
    common.dbExportResultsToCSV(sql, bkupFile)
elif data['exportAllDataLocation'] == 'displayOnScreen':
    pass
elif data['exportAllDataLocation'] == 'email':
    if data['exportAllDataType'] == 'csv':
        dataFile = csvFile
        emailMSG = 'Attached is your CSV export results'
        common.dbExportResultsToCSV(sql, dataFile)
        ybEmail.sendEmail(emailSendTo,emailSender,emailSubject,emailMSG,ATTACH=dataFile)
    elif data['exportAllDataType'] == 'xml':
        dataFile = xmlFile
        emailMSG = 'Attached is your XML export results'
        common.dbExportResultsToXML(sql, dataFile)
        ybEmail.sendEmail(emailSendTo,emailSender,emailSubject,emailMSG,ATTACH=dataFile)
    elif data['exportAllDataType'] == 'json':
        dataFile = jsonFile
        emailMSG = 'Attached is your JSON export results'
        common.dbExportResultsToJSON(sql, dataFile)
        ybEmail.sendEmail(emailSendTo,emailSender,emailSubject,emailMSG,ATTACH=dataFile)
else: 
    print('You should really stop trying to use my programs')

# make the browser happy
print jsonData
