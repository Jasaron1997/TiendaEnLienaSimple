import {Proveedores} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Proveedores.find({});
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
    Usuario} = req.body;
  try {

const datos =  new Proveedores({				
  Nombre,
  Direccion,
  Telefono,
  DPI,
  Nit,
  Fecha,
  Usuario
})
datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo proveedor Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el proveedor.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Proveedores.findById({_id});
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
const { Nombre,
  Direccion,
  Telefono,
  DPI,
  Nit,
  Fecha,
  Usuario}=req.body;
  try {
    const datos=await Proveedores.findById(
      { _id: _id });
    
      datos.Nombre=Nombre;
      datos.Direccion=Direccion;
      datos.Telefono=Telefono;
      datos.DPI=DPI;
      datos.Nit=Nit;
      datos.Fecha=Fecha;
      datos.Usuario=Usuario;
    await datos.save();
    res.json({ message: "proveedor Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar proveedor.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Proveedores.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "proveedor eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar proveedor.",
      data: {},
    });
  }
}
