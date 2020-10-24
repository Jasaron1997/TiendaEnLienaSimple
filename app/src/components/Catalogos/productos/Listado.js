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
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/producto`);
    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "i");
    const datos = this.state.data.filter((dat) => patt.test(dat.Nombre));

    this.setState({
      dataFiltrada: datos,
    });
  };

  
Carrito = async (_id) => {
  


};



cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};

  render() {
    const redireccion = this.props.auth ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">producto</h1>
        <form class="form-inline " onSubmit={this.BuscarDatos}>
          <label className="ml-5 mr-5">
            <strong>Nombre del producto:</strong>
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
            to={`${process.env.PUBLIC_URL}/productos/crear`}
            className="btn btn-link  ml-5 mr-5"
          >
            Crear
          </Link>

          <div className="row justify-content-center">
        {this.state.dataFiltrada && (
          <div className="col-12 p-2 row">
            {this.state.dataFiltrada.map((item) => {
              const { _id } = item;
              return (
                <div className="col-3 p-4">
                  <div className="card">
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                      <div className="card-body">
                        <h5 className="card-title">{item.Nombre}</h5>
                        <p className="card-text">{item.Descripcion}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Precio {item.Precio}</li>
                        <li className="list-group-item">Existencia {item.Existencia}</li>
                      </ul>
                      <div className="card-body">
                              <button className="btn btn-success"
                              onClick={() => {
                                  this.props.CarritoMemoria(item);
                                  alert("Producto agregado al carrito");
                              }}
                              type="button"
                            >
                             Agregar
                            </button>
                      </div>
                    </div> 
                    </div> 
              );
            })}
          </div>
        )}
        </div>
      </Fragment>
    );
  }
}

export default Index;
