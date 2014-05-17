DROP TABLE IF EXISTS `empman`.`departments`;
CREATE TABLE IF NOT EXISTS `empman`.`departments` (
 `deptID`        INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `deptName`      VARCHAR(20)    NOT NULL default 'default_text'
);

DROP TABLE IF EXISTS `empman`.`positions`;
CREATE TABLE IF NOT EXISTS `empman`.`positions` (
 `posID`         INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `deptID`        INT            NOT NULL,
 `posName`       VARCHAR(20)    NOT NULL default 'default_text'
);

DROP TABLE IF EXISTS `empman`.`workStations`;
CREATE TABLE IF NOT EXISTS `empman`.`workStations` (
 `stationID`       INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `stationRow`      VARCHAR(5)     NOT NULL default '1',
 `stationSeat`     VARCHAR(5)     NOT NULL default '1', 
 `stationOS`       VARCHAR(10)    NOT NULL default '',
 `stationNotes`    VARCHAR(255)   NOT NULL default ''
);

DROP TABLE IF EXISTS `empman`.`employees`;
CREATE TABLE IF NOT EXISTS `empman`.`employees` (
 `empID`         INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `empfname`      VARCHAR(20)    NOT NULL default 'default_text',
 `emplname`      VARCHAR(30)    NOT NULL default '',
 `hired`         DATETIME       NOT NULL,
 `created`       DATETIME       NOT NULL,
 `jobStatus`     VARCHAR(20)    NOT NULL default '',
 `posID`         INT            NOT NULL,
 `deptID`        INT            NOT NULL,
 `swipid`        INT(5)         NOT NULL default 12345,
 `phoneext`      INT(4)         NOT NULL default 2222,
 `reptag`        VARCHAR(5)     NOT NULL default '',
 `vmpass`        INT(4)         NOT NULL default 1234,
 `companynumber` VARCHAR(20)    NOT NULL default '',
 `netid`         VARCHAR(30)    NOT NULL default '',
 `netpass`       VARCHAR(20)    NOT NULL default '',
 `emailid`       VARCHAR(20)    NOT NULL default '',
 `emailpass`     VARCHAR(20)    NOT NULL default '',
 `emailaddress`  VARCHAR(50)    NOT NULL default '',
 `pandionid`     VARCHAR(50)    NOT NULL default '',
 `pandionpass`   VARCHAR(20)    NOT NULL default '',
 `stationID`     INT            NOT NULL,
 `notes`         VARCHAR(255)   NOT NULL default ''
);

DROP TABLE IF EXISTS `empman`.`settings`;
CREATE TABLE IF NOT EXISTS `empman`.`settings` (
 `settingID`     INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
 `param`    VARCHAR(20)    NOT NULL default 'domain',
 `value` VARCHAR(20)    NOT NULL default 'example.com'
);
