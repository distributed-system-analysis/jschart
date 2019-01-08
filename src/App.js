import React, { Component } from 'react';
import axios from 'axios';
import jschart from 'jschart';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    axios.get("http://pbench.perf.lab.eng.bos.redhat.com/results/perf138/uperf_uperf_rhel8_4.18.0-0.rc4.2.el8+7_intel_10gb_2018.07.17T14.33.18/1-tcp_stream-64B-1i/sample1/csv/uperf_Gb_sec.csv").then(res => {
      jschart.create_jschart(0, "histogram", "jschart_histogram", "Histogram Demo", "Buckets", "Bucket Size", { csvfiles: [ res.data ] })    
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JSChart Node Module Demo</h1>
        </header>
        <br></br>
        <div id="jschart_histogram"></div>
      </div>
    );
  }
}

export default App;
