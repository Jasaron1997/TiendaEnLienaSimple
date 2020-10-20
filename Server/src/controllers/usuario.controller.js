import {Usuarios} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Usuarios.find({Cliente:false});
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
  const {Usuario,
    Nombre,
    Password,Direccion,
    Telefono,
    DPI,
    Nit,
    Rol,Cliente} = req.body;
  try {

const datos =  new Usuarios({				
  Usuario,
    Nombre,
    Password,Direccion,
    Telefono,
    DPI,
    Nit,
    Rol,Cliente
})
datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo Usuario Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el Usuario.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Usuarios.findById({_id});
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
const {Usuario,
  Nombre,
  Password,
  Direccion,
  Telefono,
  DPI,
  Nit,
  Rol,
  Cliente}=req.body;
  try {
const datos=await Usuarios.findById(
  { _id: _id });

  datos.Usuario=Usuario;
  datos.Nombre=Nombre;
  datos.Password=Password;
  datos.Direccion=Direccion;
  datos.Telefono=Telefono;
  datos.DPI=DPI;
  datos.Nit=Nit;
  datos.Rol=Rol;
  datos.Cliente=Cliente;
await datos.save();
    res.json({ message: "Usuario Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar Usuario.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Usuarios.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "Usuario eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar Usuario.",
      data: {},
    });
  }
}
