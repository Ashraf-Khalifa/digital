const mysql = require("mysql");

// Create a connection to the database
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "qtechnetworks_digital_passport",
  port: "3306",
  password: "HelloRami123",
  database: "qtechnetworks_digital_passport",
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

class UserModel {
  static getUserById(userId, callback) {
    const getUserQuery = `
      SELECT * FROM users
      WHERE id = ?
    `;

    dbConnection.query(getUserQuery, [userId], callback);
  }

  static updateUserById(userId, updatedData, callback) {
    const updateUserQuery = `
      UPDATE users
      SET ? 
      WHERE id = ?
    `;

    dbConnection.query(updateUserQuery, [updatedData, userId], callback);
  }

  static deleteUserById(userId, callback) {
    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = ?
    `;

    dbConnection.query(deleteUserQuery, [userId], callback);
  }

  static getUserByEmail(email, callback) {
    const getUserByEmailQuery = `
      SELECT * FROM users
      WHERE email = ?
    `;

    dbConnection.query(getUserByEmailQuery, [email], callback);
  }

  static insertUserInfo(values, callback) {
    const userInfoQuery = `
      INSERT INTO users (photoUrl, fullName, number, gender, birthdate, nationality, city, password, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConnection.query(userInfoQuery, values, callback);
  }
}

module.exports = UserModel;
