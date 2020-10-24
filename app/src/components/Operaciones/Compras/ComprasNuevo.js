import React, { Component, Fragment } from "react";
import { fetchPost,fetchGet } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from 'react-select'
import makeAnimated from "react-select/animated";


const initialState = {
  _id:""
  ,Nombre:""
  ,Descripcion:"",
  Detalle:[]
};

class Nuevo extends Component {
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
  updateStateSelectProveedor= (Proveedor) => {
    this.setState({Proveedor});
  };

  updateStateSelectProductos= (Producto) => {
    this.setState({Producto});
  };
  validarForm = () => {
    const {Factura} = this.state;
    const noValido = !Factura;
    return noValido;
  };
  Eliminar = async (_id) => {
    let Detalle=this.state.Detalle.filter(x=> x._id!=_id);

    this.setState({
      Detalle
    })


  };

  
  async componentDidMount() {
    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/proveedor`
    );
    this.setState({ dataproveedores:data.data });

    const dataProductos = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/producto`
    );
    this.setState({ dataProductos:dataProductos.data });
  }

  Crear = async (e) => {
    e.preventDefault();
await this.setState({
  Usuario:this.props.auth
})
    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/compra`,
      this.state
    );


    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/compras");
  
    
  
  };

  agregarDetalle =async(e)=>{
    e.preventDefault();
const detalle={
  ...this.state.Producto,
  Cantidad:this.state.Cantidad,
  Total:this.state.Cantidad*this.state.Producto.Costo
}


this.setState({

  Detalle:[
  ...this.state.Detalle,
  {...detalle}
    ]
})
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
  <h1 className="text-center mb-5">Crear compra</h1>

      <div className="row justify-content-center">
        <form
          className="col-md-8 col-sm-12"
          onSubmit={(e) => this.Crear(e)}
        >
        <div className="form-group">
            <label>Proveedor:</label>
            <Select   
            onChange={this.updateStateSelectProveedor}
                options={this.state.dataproveedores}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Proveedor"}
                getOptionLabel={(options) => options.Nombre}
                getOptionValue={(options) => options.Nombre}
                value={this.state.Proveedor} />
          </div>
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
            <label>Usuario:</label>
            <input
              type="text"
              name="Usuario"
              readOnly
              className="form-control"
              defaultValue={this.props.auth.Usuario}
            />
          </div>
          <div className="form-group">
            <label>Factura:</label>
            <input
              type="text"
              name="Factura"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Factura}
            />
          </div>

         
          <div class="row">
            <div class="col-7">
            <label>Productos:</label>
            <Select   
                onChange={this.updateStateSelectProductos}
                options={this.state.dataProductos}
                isMulti={false}
                components={makeAnimated()}
                placeholder={"Seleccione el Proveedor"}
                getOptionLabel={(options) => options.Nombre}
                getOptionValue={(options) => options.Nombre}
                value={this.state.Producto} />
          </div>
          <div class="col-3">
            <label>Cantidad:</label>
            <input
              type="number"
              name="Cantidad"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Cantidad}
            />
          </div>
          </div>
          <button
          onClick={this.agregarDetalle}
            className="btn btn-primary"
          >
            Agregar
          </button>
         
                        {this.state.Detalle && (
                        <div className="m-5">
                          <div className="row border">
                            <div className="col-sm-2 col-xs-2">Nombre</div>
                            <div className="col-sm-2 col-xs-2 ">Descripcion</div>
                            <div className="col-sm-2 col-xs-2">Cantidad</div>
                            <div className="col-sm-2 col-xs-2 ">Costo</div>
                            <div className="col-sm-2 col-xs-2 ">Total</div>
                            <div className="col-sm-2 col-xs-2">OPCIONES</div>
                          </div>
                          {this.state.Detalle.map((item) => {
                            const { _id } = item;
                            return (
                              <div className="row border" key={_id}>
                                <div className="col-sm-2 col-xs-2">{item.Nombre}</div>
                                <div className="col-sm-2 col-xs-2">{item.Descripcion}</div>
                                <div className="col-sm-2 col-xs-2 d-none d-sm-block">{item.Cantidad}</div>  
                                <div className="col-sm-2 col-xs-2 d-none d-sm-block">{item.Costo}</div>
                                <div className="col-sm-2 col-xs-2 d-none d-sm-block">{item.Total}</div>    
                                <div className="col-sm-2 col-xs-2">
                                    <button
                                      onClick={() => {
                                        if (window.confirm("Seguro que deseas eliminar la fila")) {
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
          
          
          <button
            disabled={this.validarForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Comprar
          </button>
        </form>
      </div>
    </Fragment>
  );
  }
}

export default withRouter(Nuevo);
