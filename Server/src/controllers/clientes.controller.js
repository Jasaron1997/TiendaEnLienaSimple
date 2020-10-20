import {Usuarios} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Usuarios.find({Cliente:true});
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
  const {Nombre,
    Direccion,
    Telefono,
    DPI,
    Nit,
    Fecha,
    Password,Usuario} = req.body;
  try {

const datos =  new Usuarios({				
  Nombre,
  Direccion,
  Telefono,
  DPI,
  Nit,
  Fecha,
  Usuario,Password
})
datos.Cliente =true;

datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo Usuarios Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el Cliente.",
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
const {Nombre,
  Direccion,
  Telefono,
  DPI,
  Nit,
  Fecha,
  Usuario,
  Password}=req.body;
  try {
const datos=await Usuarios.findById(
  { _id: _id })

  datos.Nombre=Nombre;
  datos.Direccion=Direccion;
  datos.Telefono=Telefono;
  datos.DPI=DPI;
  datos.Nit=Nit;
  datos.Fecha=Fecha;
  datos.Usuario=Usuario;
  datos.Password=Password;


    res.json({ message: "Cliente Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar Cliente.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Usuarios.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "Cliente eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar Cliente.",
      data: {},
    });
  }
}
