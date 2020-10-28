import React, { Component, Fragment } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { fetchPost } from "./utils/Fetch";

import Login from "./components/Login";
import Navbar from "./components/Navbar/navbar";
import Inicio from "./components/Inicio";

//roles
import Rol from "./components/Seguridad/Roles";
import RolCrear from "./components/Seguridad/Roles/RolNuevo";
import Roleditar from "./components/Seguridad/Roles/RolEditar";


//Usuarios
import Usuario from "./components/Seguridad/Usuario";
import UsuarioNuevo from "./components/Seguridad/Usuario/UsuarioNuevo";
import UsuarioEditar from "./components/Seguridad/Usuario/UsuarioEditar";

import Productos from "./components/Catalogos/productos";
import ProductosNuevo from "./components/Catalogos/productos/nuevo";
import ProductosEditar from "./components/Catalogos/productos/edit";
import ProductosListado from "./components/Catalogos/productos/Listado";


import Cliente from "./components/Catalogos/Clientes";
import ClienteNuevo from "./components/Catalogos/Clientes/ClienteNuevo";
import ClienteEditar from "./components/Catalogos/Clientes/ClienteEditar";


import Compra from "./components/Operaciones/Compras";
import CompraNuevo from "./components/Operaciones/Compras/ComprasNuevo";
import CompraEditar from "./components/Operaciones/Compras/ComprasEditar";


import Venta from "./components/Operaciones/Ventas";
import VentaEditar from "./components/Operaciones/Ventas/Editar";

import CarritoVenta from "./components/Operaciones/CarritoVenta/Carrito";

import Proveedores from "./components/Catalogos/Proveedores";
import ProveedoresNuevo from "./components/Catalogos/Proveedores/ProveedorNuevo";
import ProveedoresEditar from "./components/Catalogos/Proveedores/ProveedorEditar";
function formato(texto){
  texto=texto.substring(0,10);
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: false,Carrito:[] };
  }

  async componentDidMount() {
    await this.authenticateToken();
  }

  authenticateToken = async () => {
    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/authenticateToken`,
      this.state
    );


if(data)
   { 
     this.auth(data.data);}
   else{
    this.auth(false);
   }
  };


 
  CarritoMemoriaQuitar = async (Producto) => {
    
    let carrito=await this.state.Carrito.find(x=>x._id==Producto._id);
debugger
    if((Producto.Cantidad)<=1){

       carrito=await this.state.Carrito.filter(x=>x._id!=Producto._id);


      await this.setState({
        Carrito:carrito
        })
    }else{
      if(carrito)
      {
        let carrito=this.state.Carrito;
      
      
            carrito.map((item)=>{
              if(item._id==Producto._id)
                {
            item.Cantidad--;
            item.Total=item.Precio*item.Cantidad;
              }
            })
        await this.setState({
          Carrito:carrito
          })
      }
    }


  };

  CarritoMemoria = async (Producto) => {
    
    let carrito=this.state.Carrito.find(x=>x._id==Producto._id);


if(carrito)
{
  let carrito=this.state.Carrito;
      carrito.map((item)=>{
        if(item._id==Producto._id)
          {
      item.Cantidad++;
      item.Total=item.Precio*item.Cantidad;
        }
      })
  await this.setState({
    Carrito:carrito
    })


}else{
  Producto.Cantidad=1;
  Producto.Total=1*Producto.Precio;
      await this.setState({
        Carrito:[
          ...this.state.Carrito,
          {...Producto}
            ]
        })
}
  };
 
  Access = (acceso) => {
    const { auth  } = this.state;
    // console.log('auth',auth)
    let resultadoBusqueda;

    if(auth){
      auth.Rol.map((data, index) => {
        // console.log(data.NOMBRE_ACCESO,data.NOMBRE_ACCESO === acceso)
        // return data.accesses.map((acc, index_p) => {
          if (data.Nombre === acceso) {
  

            resultadoBusqueda = true;
            return true;
          } else {
            return false;
          }
        // });
      });
    }
    else{
      return false;
    }
    return !!resultadoBusqueda;
  };

  auth = (auth) => {
    this.setState({
      auth,
    });
  };

  cerrarsesion = async () => {
    await localStorage.removeItem("token", "");
    this.authenticateToken();

  };

  render() {
    const mensaje = this.state.auth ? (
      <Fragment> 
      <p>{`Bienvenido: ${this.state.auth.Nombre}`}</p>
      <button className="btn btn-light" onClick={this.cerrarsesion}>Cerrar Sesion</button>
</Fragment>
      // `Bienvenido: Prueba de login`
    ) : (
      <Redirect to="/" />
    );

    return (
      <Router>
    
          {/* {this.authenticateToken()} */}
          <Navbar auth={this.state.auth} authenticateToken={this.authenticateToken}   Access={this.Access}/>
          <header className=" container-fluid App-header ">
          <p className="text-right">{mensaje}</p>
          <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => <Inicio auth={this.auth}   Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} render={() => <Login auth={this.auth}   Access={this.Access}/>} />
          {/*Roles */}
          <Route exact path={`${process.env.PUBLIC_URL}/roles`} render={() => <Rol Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/roles/crear`} render={() => <RolCrear Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/roles/modificar/:id`} render={() => <Roleditar Access={this.Access}/>} />

          {/*Usuario*/}
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios`} render={() => <Usuario Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/crear`} render={() => <UsuarioNuevo Access={this.Access} auth={this.state.auth}  />} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/modificar/:id`} render={() => <UsuarioEditar  Access={this.Access}/>} />
          {/*ciente*/}
          <Route exact path={`${process.env.PUBLIC_URL}/clientes`} render={() => <Cliente Access={this.Access}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/clientes/crear`} render={() => <ClienteNuevo/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/clientes/modificar/:id`} render={() => <ClienteEditar  Access={this.Access} auth={this.state.auth}/>} />

          {/*Productos*/}
          <Route exact path={`${process.env.PUBLIC_URL}/productos`} render={() => <Productos Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/productos/crear`} render={() => <ProductosNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/productos/modificar/:id`} render={() => <ProductosEditar  Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/productos/listadoproductos`} render={() => <ProductosListado  Access={this.Access} auth={this.state.auth} CarritoMemoria={this.CarritoMemoria}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/CarritoVenta`} render={() => <CarritoVenta  Access={this.Access} auth={this.state.auth} Carrito={this.state.Carrito} 
          CarritoMemoriaQuitar={this.CarritoMemoriaQuitar}
          CarritoMemoria={this.CarritoMemoria}/>} />
          
          
          {/*proveedores*/}
          <Route exact path={`${process.env.PUBLIC_URL}/proveedores`} render={() => <Proveedores formato={formato} Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/proveedores/crear`} render={() => <ProveedoresNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/proveedores/modificar/:id`} render={() => <ProveedoresEditar formato={formato} Access={this.Access}/>} />
          
          {/*compras*/}
          <Route exact path={`${process.env.PUBLIC_URL}/compras`} render={() => <Compra formato={formato} Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/compras/crear`} render={() => <CompraNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/compras/detalles/:id`} render={() => <CompraEditar formato={formato} Access={this.Access}/>} />
        
          <Route exact path={`${process.env.PUBLIC_URL}/ventas`} render={() => <Venta formato={formato} Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/ventas/detalles/:id`} render={() => <VentaEditar formato={formato} Access={this.Access}/>} />
         </Switch>
        </header>
      </Router>
    );
  }
}

export default App;
