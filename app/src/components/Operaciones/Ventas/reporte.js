import React, { Component, Fragment } from "react";
import { fetchGet,fetchDelete} from "../../../utils/Fetch";
import { Link, Redirect } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const estadoInicial = { BuscarDatos: "", data: null };



class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { data: estadoInicial };
  }

  Buscar = async () =>{
    let data = await fetchGet(`${process.env.REACT_APP_SERVER}/api/venta`);

   // item.Detalle.reduce((a, b) => a + b.Total, 0)
    data.data.map(item=>{
 item.Total=item.Detalle.reduce((a, b) => a + b.Total, 0)
 item.Cantidad=item.Detalle.reduce((a, b) => a + b.Cantidad, 0)
 item.Fecha=this.props.formato(item.Fecha)
     })

    this.setState({ dataFiltrada: data.data, data: data.data,estado:"Re Activar"});
  }

   componentDidMount() {
   this.Buscar();
  }

  BuscarDatos = (e) => {
    e.preventDefault();
    const patt = new RegExp(`${this.state.BuscarDatos}`, "i");
    const datos = this.state.data.filter((dat) => patt.exec(dat.Nombre));

    this.setState({
      dataFiltrada: datos,
    });
  };

cambioEstado = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
  });
};



// Eliminar = async (_id) => {
//   const data = await fetchDelete(
//     `${process.env.REACT_APP_SERVER}/api/ve/${_id}`
//   );
//   alert(data.message);
//   const dataGet = await fetchGet(
//     `${process.env.REACT_APP_SERVER}/api/compra`
//   );
//   this.setState({ dataFiltrada: dataGet.data, data: dataGet.data });
// };







  render() {
    const redireccion = this.props.Access("Administrador") ? (
      ""
    ) : (
      <Redirect to="/login" />
    );

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Reportes de Ventas</h1>
      <LineChart
        width={1500}
        height={500}
        data={this.state.data}
        margin={{
          top: 5, right: 30, left: 50, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Cantidad" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Total" stroke="#82ca9d" />
      </LineChart>

      </Fragment>
    );
  }
}

export default Index;
