
  import React, { Component, Fragment } from "react";
  import { fetchPut,fetchGet } from "../../../utils/Fetch";
  import { withRouter, Redirect } from "react-router-dom";
  
  const initialState = {
    _id:""
    ,Nombre:""
    ,Descripcion:""  
  };
  
  class RolEditar extends Component {
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
      const {Nombre,Descripcion} = this.state;
      const noValido = !Nombre|| ! Descripcion;
      return noValido;
    };
    
  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await fetchGet(
      `${process.env.REACT_APP_SERVER}/api/roles/${id}`
    );
    this.setState({ ...data.data });
  }
  
    RolEditar = async (e) => {
      e.preventDefault();
  

      
      const data = await fetchPut(
        `${process.env.REACT_APP_SERVER}/api/roles/${this.state._id}`,
        this.state
      );
      this.setState({ data: data.data });
      alert(data.message);
      this.props.history.push("/roles");
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
      <h1 className="text-center mb-5">Editar Rol</h1>
  
          <div className="row justify-content-center">
            <form
              className="col-md-8 col-sm-12"
              onSubmit={(e) => this.RolEditar(e)}
            >
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="Nombre"
                  className="form-control"
                  placeholder="Nombre deL rol"
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
                  placeholder="Descripcion Rol"
                  onChange={this.UpdateState}
                  defaultValue={this.state.Descripcion}
                />
              </div>
  
              <button
                disabled={this.validarForm()}
                type="submit"
                className="btn btn-success float-right"
              >
                Editar Rol
              </button>
            </form>
          </div>
        </Fragment>
      );
    }
  }
  
  export default withRouter(RolEditar);
  