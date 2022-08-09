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
  try {
    let lastname = `%${data.lastname}%`;
    let firstname = `%${data.firstname}%`;
    let middlename = `%${data.middlename}%`;
    let code = `%${data.employee_no}%`;
    let campus = `%${data.campus}%`;
    // let isActive = `%${data.isActive}%`;
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);

    const empResult = await request.query`SELECT 
                                            Emp.CODE,
                                            Emp.FIRSTNAME,
                                            Emp.LASTNAME,
                                            Emp.MIDDLENAME,
                                            Emp.EXTNAME,
                                            Emp.NAME,
                                            Emp.[CAMPUS CODE],
                                            Emp.GENDER,
                                            Emp.DEPT_DESC,
                                            Emp.POS_DESC,
                                            Emp.EMP_CLASS_DESC,
                                            Emp.EMP_STATUS_DESC,
                                            Emp.IS_ACTIVE,
                                            Emp.EMAIL,
                                            Ed.EmployeeCode,
                                            Emp.EMP_CLASS_CODE
                                            FROM [UE database]..[vw_Employees] AS Emp INNER JOIN 
                                            [UE database]..Education AS Ed ON Emp.CODE = Ed.EmployeeCode 
                                            WHERE Emp.LASTNAME LIKE ${lastname} AND 
                                            Emp.FIRSTNAME LIKE ${firstname} AND 
                                            Emp.MIDDLENAME LIKE ${middlename} AND 
                                            Emp.CODE LIKE ${code} AND 
                                            Emp.[CAMPUS CODE] LIKE ${campus} AND 
                                            Emp.IS_ACTIVE = '1' 
                                            GROUP BY 
                                            Emp.CODE,
                                            Emp.FIRSTNAME,
                                            Emp.LASTNAME,
                                            Emp.MIDDLENAME,
                                            Emp.EXTNAME,
                                            Emp.NAME,
                                            Emp.[CAMPUS CODE],
                                            Emp.GENDER,
                                            Emp.DEPT_DESC,
                                            Emp.POS_DESC,
                                            Emp.EMP_CLASS_DESC,
                                            Emp.EMP_STATUS_DESC,
                                            Emp.IS_ACTIVE,
                                            Emp.EMAIL,
                                            Ed.EmployeeCode,
                                            Emp.EMP_CLASS_CODE 
                                            ORDER BY Emp.LASTNAME DESC`;
    console.log('res: '.empResult)
    return empResult.recordset;

  } catch (error) {
    console.log(error.message);
  }
}
const getSearchEmployeeDetails = async (data, res) => {
  try {
    let lastname = `%${data.lastname}%`;
    let firstname = `%${data.firstname}%`;
    let middlename = `%${data.middlename}%`;
    let code = `%${data.employee_no}%`;
    let campus = `%${data.campus}%`;
    let inputGender = data.gender === 'MALE' ? 'M' : data.gender === 'FEMALE' ? 'F' : '';
    let gender = `%${inputGender}%`;
    let employee_department = `%${data.employee_department}%`;
    let employee_position = `%${data.employee_position}%`;
    let employee_status = `%${data.employee_status}%`;
    let employee_class = `%${data.employee_class}%`;
    // let isActive = `%${data.isActive}%`;
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);

    const empDetails = await request.query`SELECT 
                                            Emp.CODE,
                                            Emp.FIRSTNAME,
                                            Emp.LASTNAME,
                                            Emp.MIDDLENAME,
                                            Emp.EXTNAME,
                                            Emp.NAME,
                                            Emp.[CAMPUS CODE],
                                            Emp.GENDER,
                                            Emp.DEPT_DESC,
                                            Emp.POS_DESC,
                                            Emp.EMP_CLASS_DESC,
                                            Emp.EMP_STATUS_DESC,
                                            Emp.IS_ACTIVE,
                                            Emp.EMAIL,
                                            Ed.EmployeeCode,
                                            Emp.EMP_CLASS_CODE,
                                            Emp.AGE,
                                            Emp.BDATE,
                                            Emp.ADDRESS,
                                            Emp.CONTACT_ADDRESS,
                                            Emp.MOBILENO,
                                            Emp.HIRED,
                                            Emp.REGULARIZED,
                                            Emp.RESIGNED,
                                            Emp.[SERVICE YEARS],
                                            Emp.TIN,
                                            EMP.CIVIL_STATUS_DESC,
                                            Ed.DiplomaDegreeHonor
                                            FROM [UE database]..[vw_Employees] AS Emp INNER JOIN 
                                            [UE database]..Education AS Ed ON Emp.CODE = Ed.EmployeeCode 
                                            WHERE Emp.LASTNAME LIKE ${lastname} AND 
                                            Emp.FIRSTNAME LIKE ${firstname} AND 
                                            Emp.MIDDLENAME LIKE ${middlename} AND 
                                            Emp.CODE LIKE ${code} AND 
                                            Emp.[CAMPUS CODE] LIKE ${campus} AND 
                                            Emp.GENDER LIKE ${gender} AND
                                            Emp.DEPT_DESC LIKE ${employee_department} AND
                                            Emp.POS_DESC LIKE ${employee_position} AND
                                            Emp.EMP_CLASS_DESC LIKE ${employee_class} AND
                                            Emp.EMP_STATUS_DESC LIKE ${employee_status} AND
                                            Emp.IS_ACTIVE = '1' 
                                            GROUP BY 
                                            Emp.CODE,
                                            Emp.FIRSTNAME,
                                            Emp.LASTNAME,
                                            Emp.MIDDLENAME,
                                            Emp.EXTNAME,
                                            Emp.NAME,
                                            Emp.[CAMPUS CODE],
                                            Emp.GENDER,
                                            Emp.DEPT_DESC,
                                            Emp.POS_DESC,
                                            Emp.EMP_CLASS_DESC,
                                            Emp.EMP_STATUS_DESC,
                                            Emp.IS_ACTIVE,
                                            Emp.EMAIL,
                                            Ed.EmployeeCode,
                                            Emp.EMP_CLASS_CODE,
                                            Emp.AGE,
                                            Emp.BDATE,
                                            Emp.ADDRESS,
                                            Emp.CONTACT_ADDRESS,
                                            Emp.MOBILENO,
                                            Emp.HIRED,
                                            Emp.REGULARIZED,
                                            Emp.RESIGNED,
                                            Emp.[SERVICE YEARS],
                                            Emp.TIN,
                                            EMP.CIVIL_STATUS_DESC,
                                            Ed.DiplomaDegreeHonor
                                            ORDER BY Emp.LASTNAME DESC`;
    console.log('res: '.empDetails)
    return empDetails.recordset;

  } catch (error) {
    console.log(error.message);
  }
}
const getById = async (employeeId) => {
  try {
    let empId = employeeId
    empId = `%${empId}%`;
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const employee = await request.query`SELECT * FROM [UE database]..[vw_Employees] WHERE CODE LIKE ${empId}`;
    return employee.recordset;
  } catch (error) {
    return error.message;
  }
}

const getDepartment = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmp = await request.query`SELECT description FROM [UE database]..[Department] ORDER BY description`
    return getEmp.recordset;

  } catch (error) {
    console.log(error.message);
  }
}

const getPositions = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getPosition = await request.query`SELECT Position FROM [UE database]..[Position]`
    return getPosition.recordset;

  } catch (error) {
    console.log(error.message);
  }
}

const getEmployeeStatus = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmployeeStatus = await request.query`SELECT DESCRIPTION FROM [UE database]..[EmployeeStatus]`
    return getEmployeeStatus.recordset;

  } catch (error) {
    console.log(error.message);
  }
}

const getEmployeeClass = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const getEmployeeClass = await request.query`SELECT DESCRIPTION FROM [UE database]..[EmployeeClass]`
    return getEmployeeClass.recordset;

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