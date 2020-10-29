import React, { Component, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchGet } from "../../utils/Fetch";
import Listado from "../Catalogos/productos/Listado";

// import { fetchPost } from "../../utils/Fetch";
// import Error from '../Alertas/Error';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

const initialState = {

};

class Inicio extends Component {
  state = {
    ...initialState,
  };

  Buscar = async () =>{
    const data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/producto`);
    data.data.map(item=>{
      item.base64=btoa(String.fromCharCode.apply(null, (item.img.data.data)))
    })

    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }

  render() {
    debugger


    const redireccion = this.props.auth ? (
      <Redirect to="/productos/listadoproductos" />
    ) : (
     ""
    );
    return (
      <Fragment>
    {redireccion}
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

export default withRouter(Inicio);
