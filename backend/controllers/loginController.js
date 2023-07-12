const { connection } = require("../middleware/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({
        status: false,
        message: "Please provide all the required fields",
      });
    return;
  }
  const sql = `SELECT * FROM user WHERE email = '${email}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result.length === 0) {
      res
        .status(401)
        .json({ status: false, message: "The user does not exist." });
      return;
    }
    const hashedPassword = result[0].password;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      res
        .status(401)
        .json({ status: false, message: "The password is incorrect." });
      return;
    }
    const jwtToken = jwt.sign(
      {
        email: email,
        user_id: result[0].id,
        // role: result[0].role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      status: true,
      message: "User logged in successfully.",
      jwtToken,
      email: result[0].email,
      id: result[0].is,
    });
  });
};

module.exports = { login };
