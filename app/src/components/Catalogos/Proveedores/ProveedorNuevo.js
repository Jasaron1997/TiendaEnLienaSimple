import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from 'react-select'
import makeAnimated from "react-select/animated";

 
const initialState = {
  _id:""
  ,Nombre:""
  ,Descripcion:""
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
 
  validarForm = () => {
    const {Nombre} = this.state;
    const noValido = !Nombre;
    return noValido;
  };

  Crear = async (e) => {
    e.preventDefault();
await this.setState({
  Usuario:this.props.auth
})


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/proveedor`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/proveedores");
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
  <h1 className="text-center mb-5">Crear proveedor</h1>

      <div className="row justify-content-center">
        <form
          className="col-md-8 col-sm-12"
          onSubmit={(e) => this.Crear(e)}
        >
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="Nombre"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Nombre}
            />
          </div>
          <div className="form-group">
            <label>Direccion:</label>
            <input
              type="text"
              name="Direccion"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Direccion}
            />
          </div>
          <div className="form-group">
            <label>Telefono:</label>
            <input
              type="text"
              name="Telefono"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Telefono}
            />
          </div>
          <div className="form-group">
            <label>DPI:</label>
            <input
              type="text"
              name="DPI"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.DPI}
            />
          </div>

          <div className="form-group">
            <label>Nit:</label>
            <input
              type="text"
              name="Nit"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Nit}
            />
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

         
          <button
            disabled={this.validarForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Guardar
          </button>
        </form>
      </div>
    </Fragment>
  );
  }
}

export default withRouter(Nuevo);
