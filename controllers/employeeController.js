'use strict';
var CryptoJS = require("crypto-js");

const employeeData = require('../data/employees');

const getAllEmployees = async (req, res, next) => {
  console.log('res', res)
  const employee_list = await employeeData.getEmployees();
  res.send(employee_list);
  // res.status(400).send(error.message);
}

const getSearchEmployees = async (req, res, next) => {
  const data = req.body
  const employee_result = await employeeData.getSearchEmployees(data);
  for (const item of employee_result) {
    item.CODE = CryptoJS.enc.Utf8.parse(item.CODE, '@uerm!EmployeeCode')
    item.CODE = CryptoJS.enc.Base64.stringify(item.CODE)
  }
  res.send(employee_result);
}

const getSearchEmployeeDetails = async (req, res, next) => {
  const data = req.body
  const employee_result = await employeeData.getSearchEmployeeDetails(data);
  for (const item of employee_result) {
    item.IS_ACTIVE = item.IS_ACTIVE ? 'ACTIVE' : 'IN ACTIVE'
  }
  res.send(employee_result);
}

const getEmployee = async (req, res, next) => {
  console.log('reqId: ', req.params.id)
  let bytes = CryptoJS.enc.Base64.parse(req.params.id.toString(), '@uerm!EmployeeCode');
  // let employeeId = bytes.toString(CryptoJS.enc.Utf8)
  let employeeId = CryptoJS.enc.Utf8.stringify(bytes)
  const employee = await employeeData.getById(employeeId);
  res.send(employee);
}

const addEmployee = async (req, res, next) => {
  try {
    const data = req.body;
    const insert = await empoloyeeData.creatEmployee(data);
    res.send(insert);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const data = req.body;
    const updated = await employeeData.updateEmployee(employeeId, data);
    res.send(updated);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await employeeData.deleteEmployee(employeeId);
    res.send(deletedEmployee);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getDepartment = async (req, res, next) => {
  try {
    console.log('res', res)
    const employee_department = await employeeData.getDepartment();
    res.send(employee_department);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getPositions = async (req, res, next) => {
  try {
    console.log('res', res)
    const employee_position = await employeeData.getPositions();
    res.send(employee_position);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getEmployeeStatus = async (req, res, next) => {
  try {
    console.log('res', res)
    const employee_status = await employeeData.getEmployeeStatus();
    res.send(employee_status);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getEmployeeClass = async (req, res, next) => {
  try {
    console.log('res', res)
    const employee_class = await employeeData.getEmployeeClass();
    res.send(employee_class);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getAllEmployees,
  getSearchEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getDepartment,
  getPositions,
  getEmployeeStatus,
  getEmployeeClass,
  getSearchEmployeeDetails
}