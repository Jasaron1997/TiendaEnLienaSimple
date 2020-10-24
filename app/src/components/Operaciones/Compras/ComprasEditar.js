
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from 'react-select'
import makeAnimated from "react-select/animated";

 
  const initialState = {
    _id:""
    ,Nombre:"",
    Fecha:""
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

    
    updateStateSelectRol= (Rol) => {
      if(Rol.Nombre=="Administrador")
          {
            this.setState({Cliente:false})
          }
      else{
        this.setState({Cliente:true})
      }
      
          this.setState({Rol});
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
      `${process.env.REACT_APP_SERVER}/api/compra/${id}`
    );
    this.setState({ ...data.data });
  }
  
   
    render() {
      const redireccion = this.props.Access("Administrador") ? (
        ""
      ) : (
        <Redirect to="/login" />
      );
  
      return (
        <Fragment>
          {redireccion}
        <h1 className="text-center mb-5">Detalle de  compra</h1>
      
            <div className="row justify-content-center">
              <form 
                className="col-md-8 col-sm-12"
              >
              <div className="form-group">
                <label>Proveedor:</label>
                  <input readOnly
                    type="text"
                    name="Proveedor"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={(this.state.Proveedor)?this.state.Proveedor[0].Nombre:""}
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
                  <label>Usuario:</label>
                  <input
                    type="text"
                    name="Usuario"
                    readOnly
                    className="form-control"
                    defaultValue={(this.state.Usuario)?this.state.Usuario[0].Usuario:""}
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
                              {this.state.Detalle && (
                              <div className="m-5">
                                <div className="row border">
                                  <div className="col-sm-3 col-xs-3">Nombre</div>
                                  <div className="col-sm-3 col-xs-3 ">Descripcion</div>
                                  <div className="col-sm-2 col-xs-2">Cantidad</div>
                                  <div className="col-sm-2 col-xs-2 ">Costo</div>
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
                              </div>
                            )}
              
              </form>
            </div>
          </Fragment> );
    }
  }
  
  export default withRouter(Editar);
  