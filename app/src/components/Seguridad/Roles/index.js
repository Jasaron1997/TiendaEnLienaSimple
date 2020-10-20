import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";

const estadoInicial = { BuscarDatos: "", data: null };

class Rol extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/roles`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "gi");
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
    `${process.env.REACT_APP_SERVER}/api/roles/${_id}`
  );
  alert(data.message);
  const dataGet = await fetchGet(
    `${process.env.REACT_APP_SERVER}/api/roles`
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
        <h1 className="text-center mb-5">Rol</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre Rol:</strong>
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
            to={`${process.env.PUBLIC_URL}/roles/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>


        {this.state.dataFiltrada && (
          <div className="ml-5 mr-5">
            <div className="row border">
              <div className="col-sm-4 col-xs-4">NOMBRE</div>
              <div className="col-sm-4 col-xs-4 d-none d-sm-block">DESCRIPCION</div>
              <div className="col-sm-4 col-xs-4">OPCIONES</div>
            </div>
            {this.state.dataFiltrada.map((item) => {
              const { _id } = item;
              return (
                <div className="row border" key={_id}>
                  <div className="col-sm-4 col-xs-4">{item.Nombre}</div>
                  <div className="col-sm-4 col-xs-4 d-none d-sm-block">{item.Descripcion}</div>    
                  <div className="col-sm-4 col-xs-4">
                      <Link
                        to={`${process.env.PUBLIC_URL}/roles/modificar/${item._id}`}
                        className="btn btn-warning m-1"
                      >
                        Modificar
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("Seguro que deseas el rol")) {
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

export default Rol;
