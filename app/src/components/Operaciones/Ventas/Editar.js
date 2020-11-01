
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from 'react-select'
import makeAnimated from "react-select/animated";

 
  const initialState = {
    _id:""
    ,Nombre:"",
    Fecha:"",
    Estado:[]
  };

  class Editar extends Component {
    state = {
      ...initialState,
    };
  
    clearState = () => {
      this.setState({
        ...initialState,
      });
    };


    UpdateState = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };
  
    validarForm = () => {
      const {Nombre} = this.state;
      const noValido = !Nombre;
      return noValido;
    };
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/venta/${id}`
    );
    this.setState({ ...data.data });
  }
  
   
    render() {
      const redireccion = this.props.auth ? (
        ""
      ) : (
        <Redirect to="/login" />
      );
  
      return (
        <Fragment>
          {redireccion}
        <h1 className="text-center mb-5">Detalle de  venta</h1>
      
            <div className="row justify-content-center">
              <form 
                className="col-md-8 col-sm-12"
              >
              <div className="form-group">
                <label>Cliente:</label>
                  <input readOnly
                    type="text"
                    name="Cliente"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={(this.state.Cliente)?this.state.Cliente[0].Nombre:""}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha:</label>
                  <input readOnly
                    type="text"
                    name="Fecha"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={this.props.formato(this.state.Fecha)}
                  />
                </div>
                <div className="form-group">
                  <label>Estado:</label>
                  <input readOnly
                    type="text"
                    name="Fecha"
                    className="form-control"
                    onChange={this.UpdateState}
                    value={(this.state.Estado[0]?this.state.Estado[0].Nombre:"Sin estado")}
                  />
                </div>
                <div className="form-group">
                  <label>Factura:</label>
                  <input readOnly
                    type="text"
                    name="Factura"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={this.state.Factura}
                  />
                </div>
                <div className="form-group">
                  <label>Telefono:</label>
                  <input readOnly
                    type="text"
                    name="Telefono"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={this.state.Telefono}
                  />
                </div> <div className="form-group">
                  <label>Direccion:</label>
                  <input readOnly
                    type="text"
                    name="Direccion"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={this.state.Direccion}
                  />
                </div>       {this.state.Detalle && (
                              <div className="m-5">
                                <div className="row border">
                                  <div className="col-sm-3 col-xs-3">Nombre</div>
                                  <div className="col-sm-3 col-xs-3 ">Descripcion</div>
                                  <div className="col-sm-2 col-xs-2">Cantidad</div>
                                  <div className="col-sm-2 col-xs-2 ">Precio</div>
                                  <div className="col-sm-2 col-xs-2 ">Total</div>
                                </div>
                                {this.state.Detalle.map((item) => {
                                  const { _id } = item;
                                  return (
                                    <div className="row border" key={_id}>
                                      <div className="col-sm-3 col-xs-3">{item.Nombre}</div>
                                      <div className="col-sm-3 col-xs-3">{item.Descripcion}</div>
                                      <div className="col-sm-2 col-xs-2">{item.Cantidad}</div>  
                                      <div className="col-sm-2 col-xs-2">{item.Costo}</div>
                                      <div className="col-sm-2 col-xs-2">{item.Total}</div>    
                                    </div>
                                  );
                                })}
                                <div className="row border" >
                                      <div className="col-sm-3 col-xs-3">Total</div>
                                      <div className="col-sm-3 col-xs-3"></div>
                                      <div className="col-sm-2 col-xs-2"></div>  
                                      <div className="col-sm-2 col-xs-2"></div>
                                      <div className="col-sm-2 col-xs-2">{this.state.Detalle.reduce((a, b) => a + b.Total, 0)}</div>    
                                    </div>
                              </div>
                            )}
              
              </form>
            </div>
          </Fragment> );
    }
  }
  
  export default withRouter(Editar);
  