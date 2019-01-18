import React, { Component } from 'react';
import axios from 'axios';
import jschart from 'jschart';

class App extends Component {

  componentDidMount = () => {
    //Reference a sample CSV file from the production environment. 
    axios.get("{{ production_url }}").then(res => {
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
