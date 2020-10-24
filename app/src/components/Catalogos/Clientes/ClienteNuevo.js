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
  ,Descripcion:"",
  Cliente:true
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


  validarForm = () => {
    const {Nombre} = this.state;
    const noValido = !Nombre;
    return noValido;
  };

  Crear = async (e) => {
    e.preventDefault();

await this.setState({
  Rol:options[1]
})


    const data = await fetchPost(
      `${process.env.REACT_APP_SERVER}/api/usuario`,
      this.state
    );


    this.setState({ data: data.data });
    alert(data.message);
    this.props.history.push("/clientes");
  
    
  
  };

  render() {

    return (
      <Fragment>
  <h1 className="text-center mb-5">Crear Cliente</h1>

      <div className="row justify-content-center">
        <form
          className="col-md-8 col-sm-12"
          onSubmit={(e) => this.Crear(e)}
        >
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              name="Usuario"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Usuario}
            />
          </div>

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
            <label>Password:</label>
            <input
              type="password"
              name="Password"
              className="form-control"
              onChange={this.UpdateState}
              defaultValue={this.state.Password}
            />
          </div>

          <div className="form-group">
            <label>Rol:</label>
            <Select   
            onChange={this.updateStateSelectRol}
                options={options}
                isMulti={false}
                isDisabled={true}
                defaultValue={options[1]}
                components={makeAnimated()}
                placeholder={"Seleccione el Rol"}
                getOptionLabel={(options) => options.Nombre}
                getOptionValue={(options) => options.Nombre}
                value={this.state.Rol} />
          </div>
          <button
            disabled={this.validarForm()}
            type="submit"
            className="btn btn-success float-right"
          >
            Guardar Usuario
          </button>
        </form>
      </div>
    </Fragment>
  );
  }
}

export default withRouter(Nuevo);
