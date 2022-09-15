'use strict';
const userData = require('../data/Users');
const config = require("../Token/auth.config");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await userData.getUsers();
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const searchSystemUsers = async (req, res) => {
  try {
    let searchData = req.query.filter_params
    const users = await userData.searchSystemUsers(searchData);
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getProjects = async (req, res) => {
  try {
    const projects = await userData.getProjects();
    res.send(projects);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getMyProjects = async (req, res) => {
  try {
    const userCode = req.query.user_code
    console.log('q: ', userCode)
    const myProjects = await userData.getMyProjects(userCode);
    res.send(myProjects);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getCompletedProjects = async (req, res) => {
  try {
    const completedProjects = await userData.getCompletedProjects();
    res.send(completedProjects);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const searchProject = async (req, res) => {
  try {
    let searchData = req.query.filter_params
    const results = await userData.searchProject(searchData);
    res.send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const searchCompletedProject = async (req, res) => {
  try {
    let searchData = req.query.filter_params
    const results = await userData.searchCompletedProject(searchData);
    res.send(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const registerUser = async (req, res) => {
  try {
    const userRequest = req.body;

    const users = await userData.createUser(userRequest);
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const signIn = async (req, res) => {
  try {
    const reqBody = req.body;

    const logIn = await userData.logIn(reqBody);
    if (logIn.USERNAME && logIn.USER_PASSWORD) {
      var token = jwt.sign({ user_code: logIn.USER_CODE }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: logIn.ID,
        user_code: logIn.USER_CODE,
        firstname: logIn.FIRSTNAME,
        lastname: logIn.LASTNAME,
        position: logIn.POSITION,
        email: logIn.EMAIL,
        profileImage: logIn.IMAGEPROFILE,
        username: logIn.USERNAME,
        accessToken: token
      });
    } else {
      res.status(200).send({ message: logIn })
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getProfile = async (req, res) => {
  try {
    const reqQuery = req.query
    const profile = await userData.getProfile(reqQuery);
    res.status(200).send(profile)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const assignProject = async (req, res) => {
  try {
    const projectRequest = req.body;

    const projects = await userData.assignProject(projectRequest);
    res.send(projects);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const createComment = async (req, res) => {
  try {
    const commentRequest = req.body;
    const comments = await userData.createComment(commentRequest);
    res.send(comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getTrends = async (req, res) => {
  try {
    const projectCode = req.query.project_code
    console.log('pcode: ', projectCode)
    const trends = await userData.getTrends(projectCode);
    res.send(trends);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectRequest = req.body;

    const projects = await userData.updateProject(projectRequest, projectId);
    res.send(projects);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deleteProject = await userData.deleteProject(projectId);
    res.send(deleteProject);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const editProfile = async (req, res) => {
  try {
    const userRequest = req.body;

    const users = await userData.editProfile(userRequest);
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  getUsers,
  searchSystemUsers,
  getProjects,
  getMyProjects,
  getCompletedProjects,
  registerUser,
  signIn,
  assignProject,
  editProfile,
  getProfile,
  updateProject,
  searchProject,
  searchCompletedProject,
  deleteProject,
  createComment,
  getTrends
}