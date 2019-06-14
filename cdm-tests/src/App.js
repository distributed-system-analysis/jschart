import React, { Component } from "react";
import jschart from "jschart";
import d3 from "d3";

import fio_cdm_1 from './data/fio-iops.json';
import fio_cdm_2 from './data/fio-iops-host-per36-action.json';
import fio_cdm_3 from './data/fio-iops-host-per84-action.json';
import fio_cdm_4 from './data/fio-iops-host-perf36-action-job.json';
import fio_cdm_5 from './data/fio-iops-host-perf84-action-job.json';

import iostat_cdm_1 from './data/iostat-iops.json';
import iostat_cdm_2 from './data/iostat-iops-host.json';
import iostat_cdm_3 from './data/iostat-iops-host-per36-dev-sda.json';
import iostat_cdm_4 from './data/iostat-iops-host-per84-dev-nvme0n1.json';
import iostat_cdm_5 from './data/iostat-iops-host-perf36-dev-sda-type.json';
import iostat_cdm_6 from './data/iostat-iops-host-perf84-dev-nvme0n1-type.json';
import iostat_cdm_7 from './data/iostat-iops-host-dev-type.json';

var fio_choices = [
  {
    "label": "Null",
    "object": { }
  },
  {
    "label": "IOPs - Per Host",
    "object": { cdmjson_object: fio_cdm_1 }
  },
  {
    "label": "IOPs - host=perf36, per action",
    "object": { cdmjson_object: fio_cdm_2 }
  },
  {
    "label": "IOPs - host=perf84, per action",
    "object": { cdmjson_object: fio_cdm_3 }
  },
  {
    "label": "IOPs - host=perf36, per action, per job",
    "object": { cdmjson_object: fio_cdm_4 }
  },
  {
    "label": "IOPs - host=perf84, per action, per job",
    "object": { cdmjson_object: fio_cdm_5 }
  }
];
for (var i = 0; i < fio_choices.length; i++) {
  fio_choices[i].index = i;
}

function change_fio_selection() {
  jschart.chart_set_title("jschart_cdm_fio", fio_choices[this.value].label);
  jschart.chart_set_y_axis_label("jschart_cdm_fio", "Y Axis");
  jschart.chart_set_x_axis_label("jschart_cdm_fio", "X Axis");
  jschart.chart_reload_options("jschart_cdm_fio", fio_choices[this.value].object);
}

function setup_fio_chart_selection_box() {
  var myselect = d3.select("#select_fio_dataset")
    .append("select")
    .on("change", change_fio_selection)

  myselect.selectAll(".options")
    .data(fio_choices)
    .enter()
    .append("option")
    .attr("value", function(d) { return d.index; })
    .text(function(d) { return d.label; });
}

var iostat_choices = [
  {
    "label": "Null",
    "object": { }
  },
  {
    "label": "IOPs",
    "object": { cdmjson_object: iostat_cdm_1 }
  },
  {
    "label": "IOPs - Per Host",
    "object": { cdmjson_object: iostat_cdm_2 }
  },
  {
    "label": "IOPs - host=perf36,dev=sda",
    "object": { cdmjson_object: iostat_cdm_3 }
  },
  {
    "label": "IOPs - host=perf84,dev=nvme0n1",
    "object": { cdmjson_object: iostat_cdm_4 }
  },
  {
    "label": "IOPs - host=perf36,dev=sda, per type",
    "object": { cdmjson_object: iostat_cdm_5 }
  },
  {
    "label": "IOPs - host=perf84,dev=nvme0n1, per type",
    "object": { cdmjson_object: iostat_cdm_6 }
  },
  {
    "label": "IOPs - Per Host, Per Dev, Per Type",
    "object": { cdmjson_object: iostat_cdm_7 }
  }
];
for (i = 0; i < iostat_choices.length; i++) {
  iostat_choices[i].index = i;
}

function change_iostat_selection() {
  jschart.chart_set_title("jschart_cdm_iostat", iostat_choices[this.value].label);
  jschart.chart_set_y_axis_label("jschart_cdm_iostat", "Y Axis");
  jschart.chart_set_x_axis_label("jschart_cdm_iostat", "X Axis");
  jschart.chart_reload_options("jschart_cdm_iostat", iostat_choices[this.value].object);
}

function setup_iostat_chart_selection_box() {
  var myselect = d3.select("#select_iostat_dataset")
    .append("select")
    .on("change", change_iostat_selection)

  myselect.selectAll(".options")
    .data(iostat_choices)
    .enter()
    .append("option")
    .attr("value", function(d) { return d.index; })
    .text(function(d) { return d.label; });
}

class App extends Component {
  componentDidMount = () => {
    setup_fio_chart_selection_box();
    setup_iostat_chart_selection_box();

    jschart.create_jschart(
      1,
      "timeseries",
      "jschart_cdm_fio",
      "FIO",
      "Time",
      "FIO",
      {}
    );
    jschart.create_jschart(
      1,
      "timeseries",
      "jschart_cdm_iostat",
      "IOSTAT",
      "Time",
      "IOSTAT",
      {}
    );
    jschart.finish_page();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSChart CDM Demo</h1>
        </header>
        <br></br>
        <div id="jschart_cdm_fio">
          <h3 id="select_fio_dataset">
	    FIO Chart Dataset Selection:
	  </h3>
        </div>
        <div id="jschart_cdm_iostat">
          <h3 id="select_iostat_dataset">
	    IOSTAT Chart Dataset Selection:
	  </h3>
        </div>
      </div>
    );
  }
}

export default App;
