#!/usr/bin/env python
import MySQLdb, csv, json

## DB STUFF

def dbFetchOne(sql):
    conn = MySQLdb.connect (host = "localhost",
                       user = "empman",
                       passwd = "8l13n3mpm8n",
                       db = "empman")

    cursor = conn.cursor()
    cursor.execute(sql)
    dbResults = cursor.fetchone()
    cursor.close()
    conn.close()
    return dbResults

def dbFetchAll(sql):
    conn = MySQLdb.connect (host = "localhost",
                       user = "empman",
                       passwd = "8l13n3mpm8n",
                       db = "empman")

    cursor = conn.cursor()
    cursor.execute(sql)
    dbResults = cursor.fetchall()
    cursor.close()
    conn.close()
    return dbResults

def dbExecuteSql(sql):
	try:
		conn = MySQLdb.connect (host = "localhost",
                       user = "empman",
                       passwd = "8l13n3mpm8n",
                       db = "empman")

		cursor = conn.cursor ()
		cursor.execute (sql)
		cursor.close()
		conn.commit()
		conn.close()
		return 'success'
	except MySQLdb.Error, e:
		return "Error %d: %s" % (e.args[0], e.args[1])

def jsonReplaceSingleQutoes(dataFile): 
    text = ""
    with open(dataFile, "r") as f: 
        text = f.read()
        text = text.replace("\'","\"")
        #text = text.replace("\t","")
        #text = text.replace("\n","")
    with open(dataFile, "w") as f:
        f.write(text)


# functions to get data into db
def dbDeleteAllInfo():
    sqlDeleteDepts = """DELETE FROM `departments` WHERE `deptID` > 0"""
    sqlDeleteEmps = """DELETE FROM `employees` WHERE `empID` > 0"""
    sqlDeletePosions = """DELETE FROM `positions` WHERE `posID` > 0"""
    sqlDeleteStations = """DELETE FROM `workStations` WHERE `stationID` > 0"""
    sqlDeleteSettings = """DELETE FROM `settings` WHERE `settingID` > 0"""
    dbExecuteSql(sqlDeleteDepts)
    dbExecuteSql(sqlDeleteEmps)
    dbExecuteSql(sqlDeletePosions)
    dbExecuteSql(sqlDeleteStations)
    return 'done son'



def dbExportResultsToCSV(sql, filePath):
    conn = MySQLdb.connect (host = "localhost",
                       user = "empman",
                       passwd = "8l13n3mpm8n",
                       db = "empman")

    cursor = conn.cursor()
    cursor.execute(sql)

    with open(filePath,'w') as f:
        dbResults = cursor.fetchall()  
        csv_writer = csv.writer(f)
        csv_writer.writerow([i[0] for i in cursor.description]) # write headers
        csv_writer.writerows(cursor)
        del csv_writer # this will close the CSV file

    cursor.close()
    conn.close()
    return 'Done'



def dbExportResultsToXML(sql, filePath):
  csvFile = filePath+".tmp"
  dbExportResultsToCSV(sql, csvFile)

  csvData = csv.reader(open(csvFile))
  xmlData = open(filePath, 'w')
  xmlData.write('<?xml version="1.0"?>' + "\n")
  # there must be only one top-level tag
  xmlData.write('<csv_data>' + "\n")

  rowNum = 0
  for row in csvData:
      if rowNum == 0:
          tags = row
          # replace spaces w/ underscores in tag names
          for i in range(len(tags)):
              tags[i] = tags[i].replace(' ', '_')
      else: 
          xmlData.write('<row>' + "\n")
          for i in range(len(tags)):
              xmlData.write('    ' + '<' + tags[i] + '>' \
                            + row[i] + '</' + tags[i] + '>' + "\n")
          xmlData.write('</row>' + "\n")
              
      rowNum +=1

  xmlData.write('</csv_data>' + "\n")
  xmlData.close()

  return 'Done'

def dbExportResultsToJSON(sql, filePath):
  csvFile = filePath+".tmp"
  dbExportResultsToCSV(sql, csvFile)
  csvData = csv.reader(open(csvFile))
  # Get the 1st line, assuming it contains the column titles
  fieldnames = csvData.next() 
  # Get the total number of columns
  fieldnames_len = len(fieldnames)
  data = [] # Empty list
  i = 0
  for row in csvData:
      # Add an empty dict to the list
      data.append({})
      for j in range(0, len(row)):
          data[i][fieldnames[j]] = row[j]
      # What if the last few cells are empty ? There may not be commas
      for j in range(len(row), fieldnames_len):
          data[i][fieldnames[j]] = ""
      i = i + 1
  j = json.dumps(data)
  with open(filePath, 'w') as f:
    f.write(j)



