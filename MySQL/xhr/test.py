#!/usr/bin/env python

import sys, json, cgi, MySQLdb
import cgitb, os, json, pprint



## DB STUFF
conn = MySQLdb.connect (host = "localhost",
                       user = "empman",
                       passwd = "8l13n3mpm8n",
                       db = "empman")

# def dbFetchOne(sql):
# 	cursor = conn.cursor()
# 	cursor.execute(sql)
# 	dbResults = cursor.fetchone()
# 	cursor.close()
# 	conn.close()
# 	return dbResults

def dbExecuteSql(sql):
	try:
		cursor = conn.cursor ()
		cursor.execute (sql)
		cursor.close()
		conn.close()
		return 'success'
	except: 
		return 'failed'


def dbInsertDeptExists(dept):
	#sql = """INSERT INTO empman.departments (deptName) VALUES ('%s') WHERE NOT EXISTS (SELECT deptName FROM empman.departments)""" % (dept)
	sql = """INSERT IGNORE INTO `departments` SET `deptName` = '%s'""" % dept
	print dbExecuteSql(sql)
	return 'done son'

theDepartment = 'CallCenter'
dbInsertDeptExists(theDepartment)

