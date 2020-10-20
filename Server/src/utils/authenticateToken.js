const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
const { sequelize } = require("../database/database");

dotenv.config();




export default  function  authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, async (err,  user) =>  {
    console.log(err);
    if (err) return res.sendStatus(403);
    try {
  console.log(user.Usuario,'user.Usuario')

     req.user=user;
      next();
    } catch (error) {
      console.log(error);
    }
  });
}
