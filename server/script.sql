
-- CREATE USER TABLE
create table user_table (
  id varchar(10) PRIMARY KEY,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);


--CREATE EMPLOYEE TABLE
create table employee (
  id  VARCHAR(50) PRIMARY KEY,
  name varchar(50) NOT NULL,
  age smallint NOT NULL,
  phone varchar(20),
  dob DATE NOT NULL DEFAULT CURRENT_DATE,
  doj DATE NOT NULL DEFAULT CURRENT_DATE,
  avatar  TEXT,
)



-- CREATE DOCS TABLE
CREATE TYPE doc_type as ENUM('office', 'personal', 'home');

create table documents (
  id VARCHAR(50) PRIMARY KEY,
  emp_id VARCHAR(50) NOT NULL,
  doc_type doc_type NOT NULL,
  doc_url TEXT NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES employee(id)

);

--CREATE ALL DOCS TABLE
create table opendocs (
  id VARCHAR(50) PRIMARY KEY,
  doc_type VARCHAR(30),
  doc_url TEXT NOT NULL,
);


-- CREATE CONTACTS TABLE
CREATE TYPE contact_type as ENUM('PHONE', 'EMAIL');

CREATE TABLE contacts (
  id VARCHAR(50) PRIMARY KEY,
  emp_id VARCHAR(50) NOT NULL,
  contact_number VARCHAR(50) NOT NULL,
  contact_type contact_type NOT NULL,
  background_ref VARCHAR(50),

  FOREIGN KEY(emp_id) REFERENCES employee(id)
);


-- CREATE SOCIAL TABLE

CREATE TABLE social_links (
  id VARCHAR(50) PRIMARY KEY,
  link_type VARCHAR(50) NOT NULL,
  emp_id VARCHAR(50) NOT NULL,

  FOREIGN KEY(emp_id) REFERENCES employee(id),
);

-- CREATE ADDRESS TABLE
CREATE TYPE address_type as ENUM('HOME', 'OFFICE', 'OTHER');
CREATE TABLE addresses (
  id VARCHAR(50) PRIMARY KEY,
  address_type address_type NOT NULL,
  emp_id VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,

  FOREIGN KEY(emp_id) REFERENCES employee(id),
);


-- CREATE VEHICLE INFO TABLE
CREATE TYPE vehicle_type as ENUM('BIKE', 'CAR');
CREATE TYPE fuel_eligibility as ENUM('TRUE', 'FALSE');
CREATE TABLE vehicle_info (
  id VARCHAR(50) PRIMARY KEY,
  emp_id VARCHAR(50) NOT NULL,
  vehicle_type vehicle_type NOT NULL,
  model VARCHAR(50),
  eligible_for_fuel fuel_eligibility NOT NULL,

  FOREIGN KEY(emp_id) REFERENCES employee(id),
);


-- CREATE VACATION TABLE
CREATE TYPE vacation_type as ENUM('WFH', 'PL');
CREATE TABLE vacation_info (
  id VARCHAR(50) PRIMARY KEY,
  vacation_type vacation_type NOT NULL,
  emp_id VARCHAR(50) NOT NULL,

  FOREIGN KEY(emp_id) REFERENCES employee(id),
);


-- CREATE ATTENDANCE TABLE

CREATE TABLE attendance (
  id VARCHAR(50) PRIMARY KEY,
  emp_id VARCHAR(50) NOT NULL,
  date DATE DEFAULT CURRENT_DATE,

  FOREIGN KEY(emp_id) REFERENCES employee(id),
);




