'use strict';
const config = require('../../config');
const sql = require('mssql');
let bcrypt = require("bcryptjs");
const connError = new Error('Connection Error');
const queryError = new Error('Query Error');

const getUsers = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      const getUsers = await request.query`SELECT * FROM QRecords..Active_Users`;
      return getUsers.recordset
    } catch (error) {
      return queryError.message
    }
  } catch (error) {
    return connError.message
  }
}

const searchSystemUsers = async (searchData, res) => {
  const filterData = searchData
  console.log('filter data: ', filterData)
  let filter = `%${filterData}%`;
  let pool = await sql.connect(config.sql);
  let request = new sql.Request(pool);

  try {
    const users = await request.query`SELECT *
    FROM QRecords..Active_Users
    WHERE FIRSTNAME LIKE ${filter} OR 
    LASTNAME LIKE ${filter} OR 
    POSITION LIKE ${filter}`;
    
    return users.recordset;
  } catch (error) {
    return error
  }
}

const getProjects = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      const getProjects = await request.query`SELECT * FROM QRecords..Projects`;
      return getProjects.recordset
    } catch (error) {
      return queryError.message
    }
  } catch (error) {
    return connError.message
  }
}

const getMyProjects = async (userCode) => {
  try {
   
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      const myProjects = await request.query`SELECT * FROM QRecords..Projects WHERE USER_CODE = ${userCode}`;
      return myProjects.recordset
    } catch (error) {
      return queryError.message
    }
  } catch (error) {
    return connError.message
  }
}

const getCompletedProjects = async () => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      const getComProjects = await request.query`SELECT * FROM QRecords..Projects WHERE PROJECT_STATUS = 'Done'`;
      return getComProjects.recordset
    } catch (error) {
      return queryError.message
    }
  } catch (error) {
    return connError.message
  }
}

const createUser = async (userRequest) => {
  try {
    let user_code = Math.floor(100000 + Math.random() * 900000);
    user_code = `${user_code}`;
    let firstname = `${userRequest.firstname}`;
    let lastname = `${userRequest.lastname}`;
    let email = `${userRequest.email}`;
    let position = `${userRequest.position}`;
    let imageProfile = 'default.jpg';
    let username = `${userRequest.username}`;
    let password = `${userRequest.password}`;
    password = bcrypt.hashSync(password, 8);
    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    try {
      await transaction.begin();
      console.log('email: ', email);
      const checkDuplicateUsername = await new sql.Request(transaction)
        .query`SELECT COUNT(USERNAME) FROM 
        QRecords..Active_Users 
        WHERE USERNAME = ${username}`;
      console.log('checkEmail: ', Object.values(checkDuplicateUsername.recordset[0]));
      if (Object.values(checkDuplicateUsername.recordset[0]) < 1) {
        const createUser = await new sql.Request(transaction).query`INSERT INTO QRecords..Active_Users 
        (
        USER_CODE,
        FIRSTNAME,  
        LASTNAME, 
        POSITION,
        IMAGEPROFILE,
        EMAIL, 
        USERNAME, 
        USER_PASSWORD) 
        VALUES 
        (
        ${user_code},
        ${firstname},
        ${lastname},
        ${position},
        ${imageProfile},
        ${email},
        ${username},
        ${password}
        )`;
        await transaction.commit();
        return "Registration successful"
      } else {
        return "Username already in used"
      }

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

const editProfile = async (userRequest) => {
  try {
    console.log('edit: ', userRequest);
    let firstname = `${userRequest.firstname}`;
    let lastname = `${userRequest.lastname}`;
    let email = `${userRequest.email}`;
    let id = `${userRequest.id}`;

    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    console.log('reqs: ', userRequest);
    try {
      await transaction.begin();
      const editUser = await new sql.Request(transaction).query`UPDATE QRecords..Active_Users 
      SET 
      FIRSTNAME = ${firstname},
      LASTNAME = ${lastname},
      EMAIL = ${email}
      WHERE ID = ${id}`;

      await transaction.commit();
      return "Update successful"

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

const logIn = async (reqBody) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      let getUsers = await request.query`SELECT * FROM QRecords..Active_Users WHERE username = ${reqBody.username}`;
      if (!getUsers.recordset[0]) {
        return "Invalid Username";
      } else {
        let passwordIsValid = bcrypt.compareSync(reqBody.password, getUsers.recordset[0].USER_PASSWORD)
        if (!passwordIsValid) {
          return 'Invalid Password';
        }
        return getUsers.recordset[0];
      }

    } catch (error) {
      return error.message
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getProfile = async (reqQuery) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      let getUsers = await request.query`SELECT * FROM QRecords..Active_Users WHERE id = ${reqQuery.id}`;
      return getUsers.recordset;
    } catch (error) {
      return error.message
    }
  } catch (error) {
    console.log(error.message)
  }
}

const assignProject = async (projectRequest) => {
  try {
    let user_code = `${projectRequest.user_code}`;
    let project_code = Math.floor(100000 + Math.random() * 900000);
    project_code = `${project_code}`;
    let title = `${projectRequest.title}`;
    let project_description = `${projectRequest.project_description}`;
    let project_status = `${projectRequest.project_status}`;
    let author = `${projectRequest.author}`;
    let assigned_by = `${projectRequest.assigned_by}`;
    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    try {
      await transaction.begin();
      const assignProject = await new sql.Request(transaction).query`INSERT INTO QRecords..Projects 
        (
        USER_CODE,
        PROJECT_CODE,
        TITLE,  
        PROJECT_DESCRIPTION, 
        PROJECT_STATUS, 
        AUTHOR,
        ASSIGNED_BY
        ) 
        VALUES 
        (
        ${user_code},
        ${project_code},
        ${title},
        ${project_description},
        ${project_status},
        ${author},
        ${assigned_by}
        )`;
      await transaction.commit();
      return "Project has been assigned"

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

const createComment = async (commentRequest) => {
  try {
    let user_code = `${commentRequest.user_code}`;
    let t_code = Math.floor(100000 + Math.random() * 900000);
    let trend_code = `${t_code}`;
    let project_code = `${commentRequest.project_code}`;
    let title = `${commentRequest.title}`;
    let trend_description = `${commentRequest.trend_description}`;
    let trend_by = `${commentRequest.trend_by}`;
    
    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    try {
      await transaction.begin();
      const comment = await new sql.Request(transaction).query`INSERT INTO QRecords..Trends 
        (
        USER_CODE,
        TREND_CODE,
        PROJECT_CODE,
        TITLE,  
        TREND_DESCRIPTION,
        TREND_BY
        ) 
        VALUES 
        (
        ${user_code},
        ${trend_code},
        ${project_code},
        ${title},
        ${trend_description},
        ${trend_by}
        )`;
      await transaction.commit();
      return "Comment has been created"

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

const getTrends = async (projectCode) => {
  try {
    let pool = await sql.connect(config.sql);
    let request = new sql.Request(pool);
    try {
      const getTrends = await request.query`SELECT * FROM QRecords..Trends WHERE PROJECT_CODE = ${projectCode}`;
      return getTrends.recordset
    } catch (error) {
      return queryError.message
    }
  } catch (error) {
    return connError.message
  }
}

const searchProject = async (searchData, res) => {
  const filterData = searchData
  console.log('filter data: ', filterData)
  let filter = `%${filterData}%`;
  let pool = await sql.connect(config.sql);
  let request = new sql.Request(pool);

  try {
    const results = await request.query`SELECT *
    FROM QRecords..Projects 
    WHERE AUTHOR LIKE ${filter} OR 
    TITLE LIKE ${filter} OR 
    PROJECT_DESCRIPTION LIKE ${filter} OR 
    PROJECT_STATUS LIKE ${filter} OR
    ASSIGNED_BY LIKE ${filter}`;
    
    return results.recordset;
  } catch (error) {
    return error
  }
}

const searchCompletedProject = async (searchData, res) => {
  const filterData = searchData
  console.log('filter data: ', filterData)
  let filter = `%${filterData}%`;
  let pool = await sql.connect(config.sql);
  let request = new sql.Request(pool);

  try {
    const results = await request.query`SELECT *
    FROM QRecords..Projects 
    WHERE PROJECT_STATUS = 'DONE' AND
    AUTHOR LIKE ${filter} OR 
    TITLE LIKE ${filter} OR 
    PROJECT_DESCRIPTION LIKE ${filter} OR 
    ASSIGNED_BY LIKE ${filter}`;
    
    return results.recordset;
  } catch (error) {
    return error
  }
}

const updateProject = async (projectRequest, projectId) => {
  try {
    let id = `${projectId}`;
    let title = `${projectRequest.title}`;
    let project_description = `${projectRequest.project_description}`;
    let project_status = `${projectRequest.project_status}`;
    let assigned_by = `${projectRequest.assigned_by}`;
    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    try {
      await transaction.begin();
      const updateProject = await new sql.Request(transaction).query`UPDATE QRecords..Projects
      SET 
      TITLE = ${title},
      PROJECT_DESCRIPTION = ${project_description},
      PROJECT_STATUS = ${project_status}, 
      ASSIGNED_BY = ${assigned_by}
      WHERE ID = ${id}`;

      await transaction.commit();
      return "Project has been updated"

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

const deleteProject = async (projectId) => {
  try {
    console.log('delete: ', projectId)
    let id = `${projectId}`;
    await sql.connect(config.sql);
    let transaction = new sql.Transaction()
    try {
      await transaction.begin();
      const deleteProject = await new sql.Request(transaction).query`DELETE FROM QRecords..Projects WHERE ID = ${id}`;
      await transaction.commit();
      return "Project was deleted"

    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
    return error
  }
}

module.exports = {
  getUsers,
  searchSystemUsers,
  getProjects,
  getMyProjects,
  createUser,
  editProfile,
  getProfile,
  getCompletedProjects,
  logIn,
  assignProject,
  searchProject,
  searchCompletedProject,
  updateProject,
  deleteProject,
  createComment,
  getTrends
}
