import { Usuarios } from "../database/database";


export async function auth(req, res) {
  const {Usuario} = req.user;
  console.log(req.user,"req.user")
  
  
  try {
    const userone = await Usuarios.findOne({Usuario});
    if (userone) {
      res.json({
        data: userone,
      });
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.log(error);
  }
}
