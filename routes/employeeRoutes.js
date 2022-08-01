'use strict';

const express = require('express');
const employeeControll = require('../controllers/employeeController');
const router = express.Router();

router.get('/employees', employeeControll.getAllEmployees);
router.post('/search_employees', employeeControll.getSearchEmployees);
router.post('/search_employee_details', employeeControll.getSearchEmployeeDetails);
router.get('/employee/:id', employeeControll.getEmployee);
router.get('/employee', employeeControll.addEmployee);
router.put('/employee/:id', employeeControll.updateEmployee);
router.delete('/employee/:id', employeeControll.deleteEmployee);
router.get('/get_department', employeeControll.getDepartment);
router.get('/get_positions', employeeControll.getPositions);
router.get('/get_employee_status', employeeControll.getEmployeeStatus);
router.get('/get_employee_class', employeeControll.getEmployeeClass);

module.exports = {
    routes: router
}