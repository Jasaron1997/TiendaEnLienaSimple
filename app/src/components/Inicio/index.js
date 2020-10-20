import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchGet } from "../../utils/Fetch";


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

  
  render() {
   
    return (
      <Fragment>
        <div class="text-center">
          
        </div>

        <div className="container`">
          <div className="row text-center">
            <div className="col-md-3">
              <h2>MISION</h2>
              <p>
                qwqwe
              </p>
            </div>
            <div className="col-md-4">
              <h2>VISION</h2>
              <p>
               qwewq
              </p>
            </div>
            <div className="col-md-3">
              <h2>VALORES</h2>
              <p>
               qwewqe
              </p>
            </div>

          </div>

          <hr />
        </div>
        <br />
        <br />
      </Fragment>
    );
  }
}

export default withRouter(Inicio);
