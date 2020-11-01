import {Estados} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Estados.find({});
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
    Fecha} = req.body;
  try {

const datos =  new Estados({				
  Nombre,
  Descripcion,
  Fecha
})

datos.id = datos._id;
await datos.save();
    if (datos) {
      return res.json({
        message: "Nuevo Estados Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el Estado.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Estados.findById({_id});
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
  Descripcion,
  Fecha}=req.body;
  try {
const datos=await Estados.findById(
  { _id: _id })

  datos.Nombre=Nombre;
  datos.Descripcion=Descripcion;
  datos.Fecha=Fecha;
  await datos.save();

    res.json({ message: "Estado Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar Estado.",
      data: {},
    });
  }
}



export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Estados.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "Estado eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar Estado.",
      data: {},
    });
  }
}
