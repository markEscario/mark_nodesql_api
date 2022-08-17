'use strict';

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/search_employees', employeeController.getSearchEmployees);
router.get('/search_employee_details', employeeController.getSearchEmployeeDetails);

module.exports = {
    routes: router
}