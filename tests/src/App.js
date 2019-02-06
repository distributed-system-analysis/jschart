import React, { Component } from "react";
import jschart from "jschart";

class App extends Component {
  componentDidMount = () => {
    jschart.create_jschart(
      0,
      "timeseries",
      "jschart_timeseries",
      "Timeseries Demo",
      "Time (secs.)",
      "CPU Utilization",
      {
        json_object: {
          x_axis_series: "time",
          data_series_names: ["time", "data series 1", "data series 2"],
          data: [[1461027782000, 0, 1], [1461027783000, 4, 5]]
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSChart Node Module Demo</h1>
        </header>
        <br></br>
        <div id="jschart_timeseries"></div>
      </div>
    );
  }
}

export default App;
