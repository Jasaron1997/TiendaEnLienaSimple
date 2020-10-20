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

//asign


//Usuarios
import Usuario from "./components/Seguridad/Usuario";
import UsuarioNuevo from "./components/Seguridad/Usuario/UsuarioNuevo";
import UsuarioEditar from "./components/Seguridad/Usuario/UsuarioEditar";

import Productos from "./components/Catalogos/productos";
import ProductosNuevo from "./components/Catalogos/productos/nuevo";
import ProductosEditar from "./components/Catalogos/productos/edit";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
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
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/crear`} render={() => <UsuarioNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/usuarios/modificar/:id`} render={() => <UsuarioEditar  Access={this.Access}/>} />
         
          {/*Productos*/}
<Route exact path={`${process.env.PUBLIC_URL}/productos`} render={() => <Productos Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/productos/crear`} render={() => <ProductosNuevo Access={this.Access} auth={this.state.auth}/>} />
          <Route exact path={`${process.env.PUBLIC_URL}/productos/modificar/:id`} render={() => <ProductosEditar  Access={this.Access}/>} />
         
         </Switch>
        </header>
      </Router>
    );
  }
}

export default App;
