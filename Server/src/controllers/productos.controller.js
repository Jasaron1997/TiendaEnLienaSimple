import {Productos} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Productos.find({});
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
    Descripcion,
    Fecha,
    Usuario,
    Existencia,
    Precio,
    Costo} = req.body;
  try {

const datos =  new Productos({				
  Nombre,
    Descripcion,
    Fecha,
    Usuario,
    Existencia,
    Precio,
    Costo
})
datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo Producto Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el producto.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Productos.findById({_id});
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
  Descripcion,
  Fecha,
  Usuario,
  Existencia,
  Precio,
  Costo}=req.body;
  try {
const datos=await Productos.findById(
  { _id: _id })

  datos.Nombre=Nombre;
  datos.Descripcion=Descripcion;
  datos.Fecha=Fecha;
  datos.Usuario=Usuario;
  datos.Existencia=Existencia;
  datos.Precio=Precio;
  datos.Costo=Costo;    
  res.json({ message: "producto Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar producto.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Productos.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "producto eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar producto.",
      data: {},
    });
  }
}
