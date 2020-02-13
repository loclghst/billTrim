const uuidv1 = require("uuid/v1");
const DB = require("./db");
const moment = require('moment');

function getAttendanceofUser(userId, attendanceData) {
  let attendance = attendanceData.filter(d => d.emp_id === userId);
  console.log("AttendANCE ===> ", attendance)
  return attendance[0] ?   attendance[0].count ? attendance[0].count : 0 : 0;
}

async function getAllemployee() {
  const allEmployees = await DB.get("SELECT * FROM employee"); 
  const attendancedata = await DB.get("SELECT emp_id, count(*) FROM attendance GROUP BY emp_id")

  console.log(attendancedata);

  const dataToReturn = allEmployees.map(employee => ({...employee, attendance: getAttendanceofUser(employee.id, attendancedata)}));

  return dataToReturn;

}

async function createEmployee(employee) {
 try {
  console.log("employee ===> ", employee);
  const { name, phone,dob, doj, avatar, address_type, address } = employee;

  const id = uuidv1();
  const age = moment().diff(dob, 'years');
  console.log('*****',age);

  const query = {
    text: "INSERT INTO employee(id, name,age,  phone, dob, doj, avatar) VALUES($1, $2, $3, $4, $5, $6, $7)",
    values:  [id, name, age, phone, dob, doj, avatar],
  };
  await DB.mutate(query);

  //Add address to DB
  const addressId = uuidv1();
  const addAddressQuery = {
    text: "INSERT INTO addresses(id, address_type ,emp_id, address) VALUES($1, $2, $3, $4)",
    values:  [addressId, address_type , id, address],
  };
  await DB.mutate(addAddressQuery);
  return id;
 } catch(error) {
   console.log(error);
 }
}

async function deleteEmployee(id) {
  const query = {
    text: "DELETE FROM employee WHERE id = $1",
    values: [ id ],
  };

  return await DB.mutate(query);
}

async function updateEmployee(id, { name, phone}) {
  const query = {
    text: "UPDATE employee SET name = $1, phone=$2  WHERE id = $3",
    values: [name, phone, id],
  };
  return await DB.mutate(query);
}

module.exports = {
  getAllemployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};
