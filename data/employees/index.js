'use strict';
const config = require('../../config');
const sql = require('mssql');

const getEmployees = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmp = await request.query("SELECT * FROM [UE database]..[vw_Employees] WHERE code = '8287' ")
    return getEmp.recordset

  } catch (error) {
    console.log(error.message);
  }
}

const getSearchEmployees = async (data, res) => {
  let lastname = data.lastname
  let firstname = data.firstname
  let code = data.employee_no
  let middlename = data.middlename
  let campus = data.campus
  let gender = data.gender === 'MALE' ? 'M' : data.gender === 'FEMALE' ? 'F' : ''
  let employee_department = data.employee_department
  let employee_position = data.employee_position
  let employee_status = data.employee_status
  let employee_class = data.employee_class
  let isActive = data.isActive

  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    lastname = `%${lastname}%`;
    firstname = `%${firstname}%`;
    middlename = `%${middlename}%`;
    code = `%${code}%`;
    campus = `%${campus}%`;
    gender = `%${gender}%`;
    employee_department = `%${employee_department}%`;
    employee_position = `%${employee_position}%`;
    employee_status = `%${employee_status}%`;
    employee_class = `%${employee_class}%`;
    isActive = `%${isActive}%`;

    const empResult = await request.query`SELECT * FROM [UE database]..[vw_Employees] INNER JOIN 
                                          [UE database]..Education ON vw_Employees.CODE = Education.EmployeeCode 
                                          WHERE LASTNAME LIKE ${lastname} AND 
                                          FIRSTNAME LIKE ${firstname} AND 
                                          MIDDLENAME LIKE ${middlename} AND 
                                          CODE LIKE ${code} AND 
                                          [CAMPUS CODE] LIKE ${campus} AND 
                                          GENDER LIKE ${gender} AND
                                          DEPT_DESC LIKE ${employee_department} AND
                                          POS_DESC LIKE ${employee_position} AND
                                          EMP_CLASS_DESC LIKE ${employee_class} AND
                                          EMP_STATUS_DESC LIKE ${employee_status} AND
                                          IS_ACTIVE LIKE ${isActive} ORDER BY LASTNAME DESC`;
    console.log('res: '.empResult)
    return empResult.recordset

  } catch (error) {
    console.log(error.message);
  }
}
const getSearchEmployeeDetails = async (data, res) => {
  let lastname = data.lastname
  let firstname = data.firstname
  let code = data.employee_no
  let middlename = data.middlename
  let campus = data.campus
  let gender = data.gender === 'MALE' ? 'M' : data.gender === 'FEMALE' ? 'F' : ''
  let employee_department = data.employee_department
  let employee_position = data.employee_position
  let employee_status = data.employee_status
  let employee_class = data.employee_class
  let isActive = data.isActive

  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    lastname = `%${lastname}%`;
    firstname = `%${firstname}%`;
    middlename = `%${middlename}%`;
    code = `%${code}%`;
    campus = `%${campus}%`;
    gender = `%${gender}%`;
    employee_department = `%${employee_department}%`;
    employee_position = `%${employee_position}%`;
    employee_status = `%${employee_status}%`;
    employee_class = `%${employee_class}%`;
    isActive = `%${isActive}%`;

    const empDetails = await request.query`SELECT * FROM [UE database]..[vw_Employees] INNER JOIN 
                                         [UE database]..Education ON vw_Employees.CODE = Education.EmployeeCode 
                                          WHERE LASTNAME LIKE ${lastname} AND 
                                          FIRSTNAME LIKE ${firstname} AND 
                                          MIDDLENAME LIKE ${middlename} AND 
                                          CODE LIKE ${code} AND 
                                          [CAMPUS CODE] LIKE ${campus} AND 
                                          GENDER LIKE ${gender} AND
                                          DEPT_DESC LIKE ${employee_department} AND
                                          POS_DESC LIKE ${employee_position} AND
                                          EMP_CLASS_DESC LIKE ${employee_class} AND
                                          EMP_STATUS_DESC LIKE ${employee_status} AND
                                          IS_ACTIVE LIKE ${isActive} ORDER BY LASTNAME DESC `;
    console.log('res: '.empDetails)
    return empDetails.recordset

  } catch (error) {
    console.log(error.message);
  }
}
const getById = async (employeeId) => {
  console.log('id: ', employeeId)
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const employee = await request.query("SELECT * FROM [UE database]..[vw_Employees] WHERE CODE LIKE '%" + employeeId + "%' ")
    return employee.recordset;
  } catch (error) {
    return error.message;
  }
}

const getDepartment = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmp = await request.query("SELECT description FROM [UE database]..[Department] ORDER BY description")
    return getEmp.recordset

  } catch (error) {
    console.log(error.message);
  }
}

const getPositions = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getPosition = await request.query("SELECT Position FROM [UE database]..[Position]")
    return getPosition.recordset

  } catch (error) {
    console.log(error.message);
  }
}

const getEmployeeStatus = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmployeeStatus = await request.query("SELECT DESCRIPTION FROM [UE database]..[EmployeeStatus]")
    return getEmployeeStatus.recordset

  } catch (error) {
    console.log(error.message);
  }
}

const getEmployeeClass = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmployeeClass = await request.query("SELECT DESCRIPTION FROM [UE database]..[EmployeeClass]")
    return getEmployeeClass.recordset

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getEmployees,
  getSearchEmployees,
  getById,
  getDepartment,
  getPositions,
  getEmployeeStatus,
  getEmployeeClass,
  getSearchEmployeeDetails
}