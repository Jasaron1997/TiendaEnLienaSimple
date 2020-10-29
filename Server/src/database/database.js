import mongoose,{Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import { arch } from 'os';


//Variable db[0] mongoServer (Atlas)
const db=['',
'mongodb://localhost/Proyecto'];

mongoose.Promise = global.Promise;
mongoose.connect(db[1], { useNewUrlParser: true });

// mongoose.set('setFindAndModify', false);

// definir el schema de clientes mongoose.Types.ObjectId
//usuarios

const usuariosSchema = new Schema({
	Usuario: String,
  Nombre:String,
  Direccion:String,
  Telefono:Number,
  DPI:Number,
  Nit:Number,
	Password: String,
  Rol :Array,
  Cliente:Boolean
});


const rolesSchema=new Schema ({
    Nombre: String,
    Descripcion: String,
})


const VentasSchema = new mongoose.Schema({
  Cliente:Array,
  Fecha:Date,
  Factura:Number,
  Detalle:Array,
  Direccion:String,
  Telefono:Number,
});


const ComprasSchema = new mongoose.Schema({
  Proveedor:Array,
  Fecha:Date,
  Usuario:Array,
  Factura:String,
  Detalle:Array
});


const ProveedoresSchema = new mongoose.Schema({
  Nombre:String,
  Direccion:String,
  Telefono:Number,
  DPI:Number,
  Nit:Number,
  Fecha:Date,
  Usuario:Array,
});


const ProductosSchema = new mongoose.Schema({
  Nombre:String,
  Descripcion:String,
  Fecha:Date,
  Usuario:Array,
  Existencia:Number,
  Precio:Number,
  Costo:Number,
  img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
});


usuariosSchema.pre('save', function(next) {
	//si el password no esta modificado ejecuta la siguiente funcion
	if (!this.isModified('Password')) {
		return next();
	}

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(this.Password, salt, (err, hash) => {
			if (err) return next(err);
			this.Password = hash;
			next();
		});
	});
});





const Usuarios = model('usuarios', usuariosSchema);
const Roles = model('roles', rolesSchema);
const Compras= model('compras', ComprasSchema);
const Ventas = mongoose.model('ventas', VentasSchema);

const Proveedores = mongoose.model('proveedores', ProveedoresSchema);
const Productos = mongoose.model('productos', ProductosSchema);


export { Usuarios,Roles,Compras,Ventas,Proveedores,Productos};
