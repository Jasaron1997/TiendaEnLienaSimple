import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class navbar extends Component {
  state = {};
  UpdateState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  cerrarsesion = async () => {
    await localStorage.removeItem("token", "");
    this.props.authenticateToken();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className=" navbar  navbar-expand-lg navbar-dark text-black-50 bg-Color-Extra sticky-top">
        <Link to={`${process.env.PUBLIC_URL}/`} className="navbar-brand">
         Tienda Aime
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
        <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/`}
                    className="nav-link"
                  >
                    Inicio
                  </Link>
                </li>
                
                {!this.props.auth && (
            <Fragment>
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/login`}
                    className="nav-link"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/clientes/crear`}
                    className="nav-link"
                  >
                    Crear Usuario
                  </Link>
                </li>
                </Fragment>
                )}
          {this.props.auth && (
            <Fragment>
            <li className="nav-item ">
                  <Link
                    to={`${process.env.PUBLIC_URL}/CarritoVenta`}
                    className="nav-link"
                  >
                    Carrito
                  </Link>
                </li>
            {this.props.Access("Administrador") && (
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Seguridad
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles`}
                        className="dropdown-item"
                      >
                      Roles
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/usuarios`}
                        className="dropdown-item"
                      >
                      Usuarios
                      </Link>
                  
                  </div>
                </div>
              </li>
              )} 

              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Catalogos
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                      <Link
                        to={`${process.env.PUBLIC_URL}/productos/listadoproductos`}
                        className="dropdown-item"
                      >
                      Listado de productos
                      </Link>
                    {this.props.Access("Administrador") && (
                  <Fragment>
                      <Link
                        to={`${process.env.PUBLIC_URL}/productos`}
                        className="dropdown-item"
                      >
                      productos
                      </Link>
                      <Link
                        to={`${process.env.PUBLIC_URL}/proveedores`}
                        className="dropdown-item"
                      >
                      Proveedor
                      </Link>
                   

                      <Link
                        to={`${process.env.PUBLIC_URL}/clientes`}
                        className="dropdown-item"
                      >
                      clientes
                      </Link>
                      </Fragment>
                    )}
                  </div>
                </div>
              
              </li>
              <li className="nav-item dropdown">
                <div className="dropdown">
                  <button
                    class="btn nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Operaciones
                  </button>
                  <div 
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {this.props.Access("Administrador") && (
                      <Link
                        to={`${process.env.PUBLIC_URL}/compras`}
                        className="dropdown-item"
                      >
                       compras
                      </Link>
                    )}
                   
                    {this.props.Access("Cliente") && (
                      <Link
                    to={`${process.env.PUBLIC_URL}/CarritoVenta`}
                    className="nav-link"
                  >
                    Carrito
                  </Link>
                    )}
                  </div>
                </div>
                
              </li>
              
              </Fragment>
          )}
         
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(navbar);
