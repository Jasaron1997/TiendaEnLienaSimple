import React, { Component, Fragment } from "react";
import { fetchPost } from "../../../utils/Fetch";
import { withRouter, Redirect } from "react-router-dom";
import Select from 'react-select'
import makeAnimated from "react-select/animated";

  const options = [
    { Nombre: 'Administrador', Descripcion: 'Administrador' },
    { Nombre: 'Cliente', Descripcion: 'Cliente' },

  ]
const initialState = {
  _id:""
  ,Nombre:""
  ,Descripcion:""
};

class Nuevo extends Component {
  state = {
    ...initialState,
    Existencia:0
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
const auth=this.props.auth;
this.setState({...auth})


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/producto`,
      this.state
    );
    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/productos");
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
  <h1 className="text-center mb-5">Crear producto</h1>

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
            <label>Descripcion:</label>
            <input
              type="text"
              name="Descripcion"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Descripcion}
            />
          </div>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="Date"
              name="Fecha"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Fecha}
            />
          </div>
          <div className="form-group">
            <label>Existencia:</label>
            <input
              type="text"
              name="Existencia"
              className="form-control"
              readOnly={true}
              onChange={this.UpdateState}
              defaultValue={0}
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="text"
              name="Precio"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Precio}
            />
          </div>

          <div className="form-group">
            <label>Costo:</label>
            <input
              type="text"
              name="Costo"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Costo}
            />
          </div> 
         
          <button
            disabled={this.validarForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Guardar producto
          </button>
        </form>
      </div>
    </Fragment>
  );
  }
}

export default withRouter(Nuevo);
