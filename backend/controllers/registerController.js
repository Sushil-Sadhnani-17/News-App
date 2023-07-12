const { connection } = require("../middleware/database");
const bcrypt = require("bcrypt");
const { sendAccountApprovedMail } = require("../utils/mail");

const register = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password || !lastName) {
    res.status(400).json({status: false, message:"Please provide all the required fields."});
    return;
  }
  const query = `Select * from user where email = '${email}'`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
      return;
    }
    if (result.length !== 0) {
      res.status(402).json({ status: false, message: "User Already Exists!" });
      return;
    }
    bcrypt.hash(password, 10, (err, hash) => {
      const sql = `
        INSERT INTO user (firstName, lastName, email, password)
        values ('${firstName}', '${lastName}', '${email}', '${hash}');
        `;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ status: false, message: err });
          return;
        }
        const fullName = `${firstName} ${lastName}`
        sendAccountApprovedMail({ email, fullName });
        res.status(200).json({ status: true, message: email + " Registered!" });
      });
    });
  });
};

module.exports = { register };
