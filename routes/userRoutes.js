'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');

router.get('/users', usersController.getUsers);
router.get('/search_system_users', usersController.searchSystemUsers)
router.get('/projects', usersController.getProjects);
router.get('/my_projects', usersController.getMyProjects);
router.get('/completed_projects', usersController.getCompletedProjects);
router.put('/projects/:id', usersController.updateProject)
router.delete('/projects/:id', usersController.deleteProject);
router.get('/profile', usersController.getProfile)
router.post('/register', usersController.registerUser);
router.post('/sign_in', usersController.signIn)
router.post('/update_profile', usersController.editProfile)
router.post('/assign_projects', usersController.assignProject)
router.get('/search_projects', usersController.searchProject)
router.get('/search_completed_projects', usersController.searchCompletedProject)
router.post('/create_comment', usersController.createComment)
router.get('/trends', usersController.getTrends)

module.exports = {
  routes: router
}