import React, { Component } from "react";
import jschart from "jschart";

import histogram_data from './data/histogram.csv';
import timeseries_data from './data/timeseries.csv';
import xy_data from './data/xy.csv';
import jitter_data from './data/jitter.csv';

class App extends Component {
  componentDidMount = () => {
    jschart.create_jschart(
      0,
      "timeseries",
      "jschart_json",
      "JSON Demo",
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
    jschart.create_jschart(
      0,
      "histogram",
      "jschart_histogram",
      "Histogram Demo",
      "Buckets",
      "Bucket Size",
      {
	  csvfiles: [ histogram_data ]
      }
    );
    jschart.create_jschart(
      1,
      "timeseries",
      "jschart_timeseries",
      "Timeseries Demo",
      null,
      null,
      {
	  csvfiles: [ timeseries_data ],
	  sort_datasets: false
      }
    );
    jschart.create_jschart(
      0,
      "xy",
      "jschart_xy",
      "XY Demo",
      null,
      null,
      {
	  csvfiles: [ xy_data ]
      }
    );
    jschart.create_jschart(
      0,
      "xy",
      "jschart_jitter",
      "Jitter Samples",
      "Samples",
      "Latency (ns)",
      {
	  csvfiles: [ jitter_data ]
      }
    );
    jschart.create_jschart(
      0,
      "xy",
      "jschart_jitter_scatter",
      "Jitter Samples: Scatterplot",
      "Samples",
      "Latency (ns)",
      {
	  csvfiles: [ jitter_data ],
	  scatterplot: true
      }
    );
    jschart.finish_page();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSChart Demos</h1>
        </header>
        <br></br>
        <div id="jschart_json"></div>
        <div id="jschart_histogram"></div>
        <div id="jschart_timeseries"></div>
        <div id="jschart_xy"></div>
        <div id="jschart_jitter"></div>
        <div id="jschart_jitter_scatter"></div>
	</div>
    );
  }
}

export default App;
