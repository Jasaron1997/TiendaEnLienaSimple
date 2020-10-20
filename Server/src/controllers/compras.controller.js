import {Compras, Productos} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Compras.find({});
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
  const {Proveedor,
    Fecha,
    Usuario,
    Factura,
    Detalle} = req.body;
  try {

const datos =  new Compras({				
  Proveedor,
  Fecha,
  Usuario,
  Factura,
  Detalle
})
datos.id = datos._id;
await datos.save();

Detalle.map(async item=>{
  
  const {_id}= item;
  const ProductoOne = await Productos.findById({_id});
  ProductoOne.Existencia=  ProductoOne.Existencia+ item.Cantidad;

  await  ProductoOne.save()
})


    if (datos) {
      return res.json({
        message: "Nuevo compra Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el compra.",
      data: {},
    });
  }
}

export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Compras.findById({_id});
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
const {data}=req.body;
  try {
const datos=await Compras.findOneAndUpdate(
  { _id: _id },
  { data },
  { new: true }
).exec()
    res.json({ message: "compra Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar compra.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Compras.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "compra eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar compra.",
      data: {},
    });
  }
}
