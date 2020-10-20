const { sequelize, Usuarios } = require("../database/database");
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
dotenv.config();

const crearToken = (usuarioLogin, secreto, expiresIn) => {
  const { Usuario } = usuarioLogin;
  console.log(Usuario,'usuariosldfsjfld',usuarioLogin)
  return jwt.sign({ Usuario }, secreto, { expiresIn });
};



export async function auth(req, res) {
  const { Usuario,
    Password} = req.body;
  try {
    const userone = await Usuarios.findOne({Usuario});
 
    if (userone) {
      const passwordCorrecto = await bcrypt.compare(Password, userone.Password);
       if (passwordCorrecto) {
        res.json({
          data: userone,
          token: crearToken(userone, process.env.ACCESS_TOKEN, "1hr"),
        });
      } else {
        res.json({ data: null });
      }
      //   })
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.log(error);
  }
}
