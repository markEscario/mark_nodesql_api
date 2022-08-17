'use strict';
const config = require('../config');
const sql = require('mssql');

const getSearchEmployees = async (req, res) => {
  const data = req.query
  let filter = `%${data.searchData}%`;
  let pool = await sql.connect(config.sql);
  let request = new sql.Request(pool);

  try {
    const employeeResult = await request.query`SELECT *
    FROM [UE database]..[vw_Employees] 
    WHERE CODE LIKE ${filter} OR 
    LASTNAME LIKE ${filter} OR 
    FIRSTNAME LIKE ${filter} OR 
    DEPT_DESC LIKE ${filter} OR
    POS_DESC LIKE ${filter}`;
    res.send(employeeResult.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getSearchEmployeeDetails = async (req, res) => {
  const data = req.query
  let campus = `%${data.campus}%`;
  let pool = await sql.connect(config.sql);
  let request = new sql.Request(pool);

  try {
    const empDetails = await request.query`SELECT *
      FROM [UE database]..[vw_Employees] AS Emp INNER JOIN 
      [UE database]..Education AS Ed ON Emp.CODE = Ed.EmployeeCode 
      WHERE Ed.EducType = 'G' AND Emp.IS_ACTIVE = '1' AND Emp.[CAMPUS CODE] LIKE ${campus} ORDER BY Emp.LASTNAME DESC`;
      
    res.send(empDetails.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getSearchEmployees,
  getSearchEmployeeDetails
}