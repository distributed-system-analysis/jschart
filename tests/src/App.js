import React, { Component } from "react";
import jschart from "jschart";
import d3 from "d3";

import histogram_data from './data/histogram.csv';
import timeseries_data from './data/timeseries.csv';
import xy_data from './data/xy.csv';
import jitter_data from './data/jitter.csv';
import dynamic_data_1 from './data/ts1.csv';
import dynamic_data_2 from './data/ts2.csv';

var choices = [
  {
    "label": "Null",
    "object": { }
  },
  {
    "label": "Dataset 1",
    "object": { csvfiles: [ dynamic_data_1 ] }
  },
  {
    "label": "Dataset 2",
    "object": { csvfiles: [ dynamic_data_2 ] }
  }
];
for (var i = 0; i < choices.length; i++) {
  choices[i].index = i;
}

function change_selection() {
  jschart.chart_reload_options("jschart_dynamic", choices[this.value].object);
}

function setup_dynamic_chart_selection_box() {
  var myselect = d3.select("#select_dataset")
    .append("select")
    .on("change", change_selection)

  myselect.selectAll(".options")
    .data(choices)
    .enter()
    .append("option")
    .attr("value", function(d) { return d.index; })
    .text(function(d) { return d.label; });
}

class App extends Component {
  componentDidMount = () => {
    setup_dynamic_chart_selection_box();

    jschart.create_jschart(
      0,
      "xy",
      "jschart_dynamic",
      "Dynamic Chart Demo",
      "Samples",
      "Latency (ms)",
      {
        dynamic_chart: true
      }
    );
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
        <div id="jschart_dynamic">
          <h3 id="select_dataset">
	    Dynamic Chart Dataset Selection:
	  </h3>
	</div>
        <br/>
        <div id="jschart_json"></div>
        <br/>
        <div id="jschart_histogram"></div>
        <div id="jschart_timeseries"></div>
        <br/>
        <div id="jschart_xy"></div>
        <div id="jschart_jitter"></div>
        <br/>
        <div id="jschart_jitter_scatter"></div>
	</div>
    );
  }
}

export default App;
