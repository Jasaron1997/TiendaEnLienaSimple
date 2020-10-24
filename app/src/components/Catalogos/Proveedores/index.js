import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  
  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/proveedor`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "i");
    const datos = this.state.data.filter((dat) => patt.exec(dat.Nombre));

    this.setState({
      dataFiltrada: datos,
    });
  };

cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};



Eliminar = async (_id) => {
  const data = await fetchDelete(
    `${process.env.REACT_APP_SERVER}/api/proveedor/${_id}`
  );
  alert(data.message);
  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/proveedor`
  );
  this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
};







  render() {
    const redireccion = this.props.Access("Administrador") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">proveedor</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre del proveedor:</strong>
          </label>
          <input
            class="form-control mr-sm-5"
            type="search"
            name="BuscarDatos"
            onChange={this.cambioEstado}
            defaultValue={this.state.BuscarDatos}
            placeholder=""
            aria-label="Search"
          />
          <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Buscar
          </button>
        </form>

          <Link
            to={`${process.env.PUBLIC_URL}/proveedores/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>


        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-2 col-xs-2">NOMBRE</div>
              <div className="col-sm-2 col-xs-2">Direccion</div>
              <div className="col-sm-2 col-xs-2 d-none d-sm-block">Telefono</div>
              <div className="col-sm-1 col-xs-1 d-none d-sm-block">DPI</div>
              <div className="col-sm-1 col-xs-1 d-none d-sm-block">Nit</div>
              <div className="col-sm-1 col-xs-1 d-none d-sm-block">Fecha</div>
              <div className="col-sm-2 col-xs-2">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { _id } = item;
              return (
                <div className="row border" key={_id}>
                  <div className="col-sm-2 col-xs-2">{item.Nombre}</div>
                  <div className="col-sm-2 col-xs-2">{item.Direccion}</div>
                  <div className="col-sm-2 col-xs-2 d-none d-sm-block">{item.Telefono}</div>    
                  <div className="col-sm-1 col-xs-1 d-none d-sm-block">{item.DPI}</div>    
                  <div className="col-sm-1 col-xs-1 d-none d-sm-block">{item.Nit}</div>    
                  <div className="col-sm-1 col-xs-1 d-none d-sm-block">{this.props.formato(item.Fecha)}</div>    
                  <div className="col-sm-2 col-xs-2">
                      <Link
                        to={`${process.env.PUBLIC_URL}/proveedores/modificar/${item._id}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el proveedor")) {
                            this.Eliminar(item._id);
                          }
                        }}
                        type="button"
                        className="btn btn-danger m-1 "
                      >
                        &times; Eliminar
                      </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Index;
