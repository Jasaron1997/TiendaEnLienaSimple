
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet,fetchPost } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  import Select from 'react-select'
import makeAnimated from "react-select/animated";

 
  const initialState = {
    _id:""
    ,Nombre:"",
  };

  class Carrito extends Component {
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
      const {Fecha} = this.state;
      const noValido = !Fecha||!this.props.Carrito[0];
      return noValido;
    };
    
  async componentDidMount() {
    this.setState({Carrito:this.props.Carrito });


  }

  async componentDidUpdate(prevProps) {
    if (this.props.Carrito !== prevProps.Carrito) {
    await  this.setState({Carrito:this.props.Carrito });


    }
  }

  Crear = async (e) => {
    e.preventDefault();


await this.setState({
  Cliente:this.props.auth,
  Detalle:this.props.Carrito
})
    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/venta`,
      this.state
    );


    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/productos/listadoproductos");
    
  
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
        <h1 className="text-center mb-5">Detalle de  Carrito</h1>
      
            <div className="row justify-content-center">
              <form  
          onSubmit={(e) => this.Crear(e)}
                className="col-md-8 col-sm-12"
              >
                <div className="form-group">
                  <label>Fecha:</label>
                  <input 
                    type="date"
                    name="Fecha"
                    className="form-control"
                    onChange={this.UpdateState}
                    defaultValue={this.state.Fecha}
                  />
                </div>
                <div className="form-group">
                  <label>Cliente:</label>
                  <input
                    type="text"
                    name="Usuario"
                    readOnly
                    className="form-control"
                    defaultValue={(this.props.auth.Usuario)?this.props.auth.Usuario:""}
                  />
                </div>
                              {this.state.Carrito && (
                              <div className="m-2">
                                <div className="row border">
                                  <div className="col-sm-2 col-xs-2">Nombre</div>
                                  <div className="col-sm-2 col-xs-2 ">Descripcion</div>
                                  <div className="col-sm-2 col-xs-2">Cantidad</div>
                                  <div className="col-sm-2 col-xs-2 ">Precio</div>
                                  <div className="col-sm-2 col-xs-2 ">Total</div>
                                  <div className="col-sm-2 col-xs-2 ">Opciones</div>

                                </div>
                                {this.state.Carrito.map((item) => {
                                  const { _id } = item;
                                  return (
                                    <div className="row border" key={_id}>
                                      <div className="col-sm-2 col-xs-2">{item.Nombre}</div>
                                      <div className="col-sm-2 col-xs-2">{item.Descripcion}</div>
                                      <div className="col-sm-2 col-xs-2">{item.Cantidad}</div>  
                                      <div className="col-sm-2 col-xs-2">{item.Precio}</div>
                                      <div className="col-sm-2 col-xs-2">{item.Total}</div> 
                                      <div className="col-sm-2 col-xs-2">
                                         <button className="btn btn-danger"
                                                onClick={() => {
                                                    this.props.CarritoMemoriaQuitar(item);
                                                }}
                                                type="button"
                                              >
                                              -
                                              </button>
                                              <button className="btn btn-success"
                                                onClick={() => {
                                                    this.props.CarritoMemoria(item);
                                                }}
                                                type="button"
                                              >
                                              +
                                              </button>
                                      </div>    

                                    </div>
                                  );
                                })}
                                <div className="row border" >
                                      <div className="col-sm-2 col-xs-2">Total</div>
                                      <div className="col-sm-2 col-xs-2"></div>
                                      <div className="col-sm-2 col-xs-2"></div>
                                      <div className="col-sm-2 col-xs-2"></div>
                                      <div className="col-sm-2 col-xs-2"></div>
                                      <div className="col-sm-2 col-xs-2">{this.state.Carrito.reduce((a, b) => a + b.Total, 0)}</div>    
                                    </div>
                              </div>
                            )}
                            <button
            disabled={this.validarForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Comprar
          </button>
              </form>
            </div>
          </Fragment> );
    }
  }
  
  export default withRouter(Carrito);
  