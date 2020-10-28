import {Roles} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Roles.find({});
 res.json({
  data: datos,
});
  } catch (error) {
    console.log(error);
    res.json({
      data: [],
      message: "No se encontraron datos",
    });
  }
}


export async function post(req, res) {
  const {    Nombre,
    Descripcion} = req.body;
  try {

const datos =  new Roles({				
  Descripcion,
  Nombre
})
datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo Roles Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el Roles.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Roles.findById({_id});
    res.json({
         data: datos,
       });
   
  } catch (error) {
    res.json({
      data: {},
      message: "No se encontraron datos unicos",
    });
  }
}

export async function put(req, res) {
  const { _id } = req.params;
const {Nombre,Descripcion}=req.body;
  try {
const datos=await Roles.findById(_id);
datos.Nombre=Nombre;
datos.Descripcion=Descripcion;
await datos.save();
    res.json({ message: "Roles Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar Roles.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Roles.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "Roles eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar Roles.",
      data: {},
    });
  }
}
