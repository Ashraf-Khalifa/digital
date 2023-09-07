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

class EmailModel {
  static insertEmail(email, otp, callback) {
    const emailInsertQuery = `
      INSERT INTO email (email, otp)
      VALUES (?, ?)
    `;

    dbConnection.query(emailInsertQuery, [email, otp], callback);
  }

  static getEmailByOTP(otp, callback) {
    const checkEmailQuery = `
      SELECT email FROM email WHERE otp = ?
    `;

    dbConnection.query(checkEmailQuery, [otp], callback);
  }

  static updateEmailToken(email, token, callback) {
    const updateTokenQuery = `
      UPDATE email
      SET token = ?, verify = 1
      WHERE email = ?
    `;

    dbConnection.query(updateTokenQuery, [token, email], callback);
  }

  static clearEmailToken(token, callback) {
    const clearTokenQuery = `
      UPDATE email
      SET token = NULL, verify = 0
      WHERE token = ?
    `;

    dbConnection.query(clearTokenQuery, [token], callback);
  }

  static getEmailByToken(token, callback) {
    const searchEmailQuery = `
      SELECT email FROM email
      WHERE token = ?
    `;

    dbConnection.query(searchEmailQuery, [token], callback);
  }
}

module.exports = EmailModel;
