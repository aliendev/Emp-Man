#!/usr/bin/env python
import sys, json, cgi, os, time, re, csv, csvcool
import cgitb, os, json, pprint, common
import xml.etree.ElementTree as xml

#Variables used for settings (you can change these) 
dataDir = "/srv/www/emp-man.aliendev.com/public_html/data/"
csvFile = dataDir+"importNewData.csv"
csvXFile = dataDir+"importNewDataExcel.csv"
jsonFile = dataDir+"importNewData.js"
xmlFile = dataDir+"importNewData.xml"

#Dont remove this
imp = {}

# CGI Return stuff
cgitb.enable()
print "Content-Type: application/json\n\n"
form = cgi.FieldStorage()
result = {}
result['success'] = True
result['message'] = "The command Completed Successfully"
result['keys'] = ",".join(form.keys())
data = {} # this is the important part for the rest of the program
for k in form.keys():
    data[k] = form.getvalue(k)

fileType = data['importReplaceDataFileType']

result['data'] = data
result['datatwo'] = fileType
#result['dataFile'] = csvFile
jsonData = json.dumps(result) 

def importIntoMysql(d):
    sql = """INSERT IGNORE INTO `employees` SET """
    sql += """`empfname` = '%s', """ % d['fname']
    sql += """`emplname` = '%s', """ % d['lname']
    sql += """`hired` = '%s', """ % d['hired']
    sql += """`created` = '%s', """ % d['created']
    sql += """`jobStatus` = '%s', """ % d['jobStatus']
    sql += """`swipid` = %s, """ % d['swipeid']
    sql += """`phoneext` = %s, """ % d['phoneExt']
    sql += """`reptag` = '%s', """ % d['repTag']
    sql += """`vmpass` = %s, """ % d['vmpass']
    sql += """`companynumber` = '%s', """ % d['compNumber']
    sql += """`netid` = '%s', """ % d['netid']
    sql += """`netpass` = '%s', """ % d['netPass']
    sql += """`emailid` = '%s', """ % d['emailid']
    sql += """`emailpass` = '%s', """ % d['emailPass']
    sql += """`emailaddress` = '%s', """ % d['emailAddress']
    sql += """`pandionid` = '%s', """ % d['pandionid']
    sql += """`pandionpass` = '%s', """ % d['pandionpass']
    sql += """`notes` = '%s'""" % d['notes']
    common.dbExecuteSql(sql)
    return 'done son'

if(fileType == 'csv'):
    dataFile = csvFile
    try:
        with open(dataFile) as f:
            common.dbDeleteAllInfo()
            csv = csvcool.read(f)
            for row in csv: 
                imp['fname'] = row['empfname'] 
                imp['lname'] = row['emplname']
                imp['hired'] = row['hired'] 
                imp['created'] = row['created']
                imp['jobStatus'] = row['jobStatus']
                imp['swipeid'] = row['swipid'] 
                imp['phoneExt'] = row['phoneext'] 
                imp['repTag'] = row['reptag'] 
                imp['vmpass'] = row['vmpass']
                imp['compNumber'] = row['companynumber']
                imp['netid'] = row['netid'] 
                imp['netPass'] = row['netpass']
                imp['emailid'] = row['emailid'] 
                imp['emailPass'] = row['emailpass']
                imp['emailAddress'] = row['emailaddress']
                imp['pandionid'] = row['pandionid']
                imp['pandionpass'] = row['pandionpass']
                imp['notes'] = row['notes'] 
                if(imp['fname']):
                    importIntoMysql(imp)
    except IOError as e:
        print 'Oh dear.'

elif(fileType == 'xml'):
    dataFile = xmlFile
    try:
        with open(dataFile) as f:
            common.dbDeleteAllInfo()
            tree = xml.parse(dataFile)
            rootElement = tree.getroot()
            rows = rootElement.findall("ROW")
            if rows != None:
                for row in rows:
                    imp['fname'] = row.find('empfname').text # jsonFileData[obj]['empfname']
                    imp['lname'] = row.find('emplname').text # jsonFileData[obj]['emplname']
                    imp['hired'] = row.find('hired').text # jsonFileData[obj]['hired']
                    imp['created'] = row.find('created').text # jsonFileData[obj]['created']
                    imp['jobStatus'] = row.find('jobStatus').text # jsonFileData[obj]['jobStatus']
                    imp['swipeid'] = row.find('swipid').text # jsonFileData[obj]['swipid']
                    imp['phoneExt'] = row.find('phoneext').text # jsonFileData[obj]['phoneext']
                    imp['repTag'] = row.find('reptag').text # jsonFileData[obj]['reptag']
                    imp['vmpass'] = row.find('vmpass').text # jsonFileData[obj]['vmpass']
                    imp['compNumber'] = row.find('companynumber').text # jsonFileData[obj]['companynumber']
                    imp['netid'] = row.find('netid').text # jsonFileData[obj]['netid']
                    imp['netPass'] = row.find('netpass').text # jsonFileData[obj]['netpass']
                    imp['emailid'] = row.find('emailid').text # jsonFileData[obj]['emailid']
                    imp['emailPass'] = row.find('emailpass').text # jsonFileData[obj]['emailpass']
                    imp['emailAddress'] = row.find('emailaddress').text # jsonFileData[obj]['emailaddress']
                    imp['pandionid'] = row.find('pandionid').text # jsonFileData[obj]['pandionid']
                    imp['pandionpass'] = row.find('pandionpass').text # jsonFileData[obj]['pandionpass']
                    imp['notes'] = row.find('notes').text # jsonFileData[obj]['notes']
                    if(imp['fname']):
                        importIntoMysql(imp)

    except IOError as e:
        print 'Oh dear.'

elif(fileType == 'json'):
    dataFile = jsonFile
    if(os.path.isfile(dataFile)):
        common.jsonReplaceSingleQutoes(dataFile)
    try:
        with open(dataFile) as f:
            common.dbDeleteAllInfo()
            jsonFileData = json.load(f)
            for obj in jsonFileData:
                #parse data and make variables 
                imp['fname'] = jsonFileData[obj]['empfname']
                imp['lname'] = jsonFileData[obj]['emplname']
                imp['hired'] = jsonFileData[obj]['hired']
                imp['created'] = jsonFileData[obj]['created']
                imp['jobStatus'] = jsonFileData[obj]['jobStatus']
                imp['swipeid'] = jsonFileData[obj]['swipid']
                imp['phoneExt'] = jsonFileData[obj]['phoneext']
                imp['repTag'] = jsonFileData[obj]['reptag']
                imp['vmpass'] = jsonFileData[obj]['vmpass']
                imp['compNumber'] = jsonFileData[obj]['companynumber']
                imp['netid'] = jsonFileData[obj]['netid']
                imp['netPass'] = jsonFileData[obj]['netpass']
                imp['emailid'] = jsonFileData[obj]['emailid']
                imp['emailPass'] = jsonFileData[obj]['emailpass']
                imp['emailAddress'] = jsonFileData[obj]['emailaddress']
                imp['pandionid'] = jsonFileData[obj]['pandionid']
                imp['pandionpass'] = jsonFileData[obj]['pandionpass']
                imp['notes'] = jsonFileData[obj]['notes']
                if(imp['fname']):
                    importIntoMysql(imp)

    except IOError as e:
        print 'Oh dear.'

else:
    print('you better stay out my programs dude')


# make the browser happy
print jsonData