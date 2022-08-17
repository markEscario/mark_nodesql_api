'use strict';

const express = require('express');
const router = express.Router();
const dropDownSelectController = require('../controllers/dropdownSelectController');

router.get('/department', dropDownSelectController.getDepartment);
router.get('/positions', dropDownSelectController.getPositions);
router.get('/employee_status', dropDownSelectController.getEmployeeStatus);
router.get('/employee_class', dropDownSelectController.getEmployeeClass);

module.exports = {
  routes: router
}