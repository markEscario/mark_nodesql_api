'use strict';
const config = require('../config');
const sql = require('mssql');

const getDepartment = async (req, res, next) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);

    const department = await request.query`SELECT description FROM [UE database]..[Department] ORDER BY description`
    res.send(department.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getPositions = async (req, res, next) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);

    const positions = await request.query`SELECT Position FROM [UE database]..[Position]`
    res.send(positions.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getEmployeeStatus = async (req, res, next) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const employee_status = await request.query`SELECT DESCRIPTION FROM [UE database]..[EmployeeStatus]`
    res.send(employee_status.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getEmployeeClass = async (req, res, next) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    const employee_class = await request.query`SELECT DESCRIPTION FROM [UE database]..[EmployeeClass]`
    res.send(employee_class.recordset);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getDepartment,
  getPositions,
  getEmployeeStatus,
  getEmployeeClass,
}