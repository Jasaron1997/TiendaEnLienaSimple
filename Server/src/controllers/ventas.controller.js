import { set } from "mongoose";
import {Ventas, Productos, Estados} from "../database/database"

export async function get(req, res) {
  try {
  
 const datos = await Ventas.find({});
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
  const {Cliente,
    Fecha,
    Usuario,Direccion,Telefono,
    Detalle} = req.body;
  try {

let Factura=await Ventas.count({});
let estados=await Estados.find({});


console.log(Factura)
Factura++;
const datos =  new Ventas({				
  Cliente,
  Fecha,
  Estado:estados[0],
  Usuario,Direccion,Telefono,
  Factura,
  Detalle
})
datos.id = datos._id;
await datos.save();

Detalle.map(async item=>{
  
  const {_id}= item;
  const ProductoOne = await  Productos.findById({_id});
  ProductoOne.Existencia=  ProductoOne.Existencia- item.Cantidad;

  await  ProductoOne.save()
})


    if (datos) {
      return res.json({
        message: "Nuevo venta Creado",
        data: datos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No se pudo crear el venta.",
      data: {},
    });
  }
}

export async function mio(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Ventas.find({"Cliente._id":_id});
    res.json({
         data: datos,
       });
   
  } catch (error) {
    res.json({
      data: {},
      message: "No se encontraron datos",
    });
  }
}


export async function getOne(req, res) {
  const { _id } = req.params;
  try {
    const datos = await await Ventas.findById({_id});
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
const datos=await Ventas.findOneAndUpdate(
  { _id: _id },
  { data },
  { new: true }
).exec()
    res.json({ message: "venta Modificado", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar venta.",
      data: {},
    });
  }
}

export async function cambio(req, res) {
  const { _id } = req.params;
  try {
  let datos=await Ventas.findById({_id})
  let estados= await Estados.find({});

  let IndexAnterior;

  if(datos.Estado[0])
  estados.map((item,index)=>{
    if(item._id.toString()==datos.Estado[0]._id.toString()){
      console.log(item.Nombre,index,"adentro")
      IndexAnterior=index;}
  })


if(IndexAnterior==undefined){
  IndexAnterior=-1;
}


  let nuevodato=await Ventas.findByIdAndUpdate({_id},{"$set":{"Estado":estados[IndexAnterior+1]}})
    res.json({ message: "el estado a cambiado", data: nuevodato });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo Modificar venta.",
      data: {},
    });
  }
}


export async function del(req, res) {
  const { _id } = req.params;
  try {
    const datos=Ventas.findOneAndDelete({ _id })
    .exec()
    res.json({ message: "venta eliminar", data: datos });
  } catch (e) {
    console.log(e);
    res.json({
      message: "No se pudo eliminar venta.",
      data: {},
    });
  }
}
