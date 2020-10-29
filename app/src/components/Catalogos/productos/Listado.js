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
    let data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/producto`);

    data.data.map(item=>{
      item.base64=btoa(String.fromCharCode.apply(null, (item.img.data.data)))
    })



   await this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});




// debugger
//   var datosss=data.data[0].img.data.data

    
//     var b64 = this.ToBase64(datosss);
//     console.debug(b64);
//     console.debug(this.FromBase64(b64));
//     console.log(this.FromBase64(b64))
    
  }
  ToBase64 = function (u8) {
    return btoa(String.fromCharCode.apply(null, u8));
  }
  
  FromBase64 = function (str) {
    return atob(str).split('').map(function (c) { return c.charCodeAt(0); });
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


_arrayBufferToBase64=( buffer )=> {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

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
                   <img class="card-img-top" src={"data:image/jpeg;base64,"+item.base64} alt="Card image cap"/>
                 {/* <img class="card-img-top" src={item.img.data.toString('base64')} alt="Card image cap"/>
                  <img class="card-img-top" src={"data:image/"+item.img.data.toString('base64')} alt="Card image cap"/>
                  <img class="card-img-top" src={"data:image/"+item.img.data} alt="Card image cap"/>
                  <img class="card-img-top" src={"data:image/jpeg;base64,"+item.img.data} alt="Card image cap"/>
                  <img class="card-img-top" src={"data:image/jpeg;base64,"+item.img.data.toString('base64')} alt="Card image cap"/>
                      e.target.result.split(',')[1]*/}

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
