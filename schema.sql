DROP DATABASE IF EXISTS personnel_DB;
CREATE DATABASE personnel_DB;
USE personnel_DB;

CREATE TABLE employee(
  id INT NOT NULL ,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT Null,  
  PRIMARY KEY (id)
);
CREATE TABLE roll(
  id INT NOT NULL ,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INT NULL,  
  PRIMARY KEY (id)
);
CREATE TABLE department(
  id INT NOT NULL ,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);


  