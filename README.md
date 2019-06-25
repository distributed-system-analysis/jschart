## About

    LPCPU (Linux Performance Customer Profiler Utility): ./tools/jschart.pm/jschart.js

    (C) Copyright IBM Corp. 2015

    This file is subject to the terms and conditions of the Eclipse
    Public License.  See the file LICENSE in this directory for more
    details.

This is a Javascript library that renders SVG charts.

This library depends on 3 external packages: `d3.js`, `d3-queue.js`, and `saveSvgAsPng.js`

Those packages are available via npm:

- https://github.com/mbostock/d3 -- API version 3
- https://github.com/d3/d3-queue -- API version 3
- https://github.com/exupero/saveSvgAsPng

This library supports the override of some paramters via the URL.

For example:

    page.html?threshold=5&threshold_invalidate_on_load=true

This testing environment is comprised of a simple React application to test
changes to the jschart node module and ensure native functionality with React.

## Scaffolding

```bash
├── jschart                  # local node module
│   ├── index.js             # library entry point
│   ├── index.css            # library styling
│   └── package.json         # library config
├── tests                    # testing environment
│   ├── public
│   ├── src
│   │   ├── App.js           # App component definition
│   │   ├── App.test.js      # App component test definition
│   │   └── index.js         # testing environment entry point
│   └── package.json         # testing environment config
├── README.md
└── LICENSE
```

## Installation

The `tests` directory represents the testing environment for ensuring native functionality with React. Run the following commands from the root of this directory to prepare the environment for local development:

Install Testing Environment Dependencies

```bash
$ yarn install
```

Install Local jschart Node Module

```bash
$ cd jschart  
$ yarn link
$ cd ../tests 
$ yarn link "jschart"
```

Verify Local jschart Node Module Installation

```bash
$ readlink -e node_modules/jschart
```

Start Development Server

```bash
$ yarn start
```

## Publishing Node Module

```bash
$ yarn login
$ yarn publish
```

## Detailed Usage

Using jschart:

The jschart library has the following defined API for end-user development:

- create_jschart(`stacked`, `data model`, `location`, `chart title`, `x axis title`, `y axis title`, `options`);

  Here is a summary of each parameter:

  1.  `stacked`

      This parameter tells the library whether the chart is a simple
      line chart or a stacked area chart. There are two different
      methodologies of supplying this parameter. In the original
      invocation it was a simple boolean field: '1' or 'true' for a
      stacked area chart and '0' or 'false' for a regular line chart.
      When jschart was ported to pbench, support for two additional
      values were added: 'stackedAreaChart' and 'lineChart'. These new
      parameters were simply mapped to the existing values for
      compatilibity purposes.

  2.  `data model`

      This parameter tells the library what kind of chart is being
      built, which ultimately results in configuring how the X axis is
      setup. There are three possible values for `data model`:

      a. 'xy'  
      b. 'timeseries'  
      c. 'histogram'

      An 'xy' chart means that the supplied data is just a series of
      X/Y value pairs to be plotted without any additional processing.
      A 'timeseries' chart differs from the 'xy' chart because the X
      axis values are milliseconds since epoch timestamps. When the
      chart is being drawn the integer timestamps are used just like a
      regular X/Y value pair but at the presentation layer the
      timestamps are converted into user decipherable timestamps,
      generally of the form 'YYYY-MM-DD HH:MM:SS'. A 'histogram' chart
      is treated very similarly to an 'xy' chart from a plotting
      perspective, but the values are interpreted to be a bucket/count
      pair rather than simple X/Y coordinates. When the data table is
      populated this results in different statistics being conveyed to
      the user than a normal 'xy' chart.

  3.  `location`

      The `location` parameter tells the library where to insert the
      chart and its accompanying table into the HTML DOM. This is
      usually implemented in the following fashion:

      ```HTML
      <div id='foo'>
        <script>
          create_jschart(<stacked>, <data model>, 'foo', <chart title>, <x axis title>, <y axis title>, <options>);
        </script>
      </div>
      ```

      This could also be implemented with a much less direct linkage,
      such as:

      ```HTML
      <script>
        create_jschart(<stacked>, <data model>, 'bar', <chart title>, <x axis title>, <y axis title>, <options>);
      </script>
      <div id='bar'/>
      ```

  4.  `chart title`

      This is simply the title printed at the top of the chart.

  5.  `x axis title`

      This is the title printed below the X axis.

  6.  `y axis title`

      This is the title printed above the Y axis.

  7.  `options`

      The `options` parameter is a javascript object that is a
      catch-all for many parameters. All of the parameters supplied
      here are optional, but there must be something here. For
      example, there are many different ways of supplying data files,
      but at least one of them must be used in order to achieve a
      working chart.

      Here is a list of the available options:

      a. timeseries_timezone  
      b. legend_entries  
      c. plotfiles[]  
      d. plotfile  
      e. packed  
      f. csvfiles[]  
      g. json_plotfile  
      h. json_args  
      i. update_interval  
      j. history_length  
      k. json_object  
      l. raw_data_sources[]  
      m. threshold  
      n. sort_datasets  
      o. x_min  
      p. x_max  
      q. y_min  
      r. y_max  
      s. x_log_scale  
      t. y_log_scale  
      u. scatterplot

      Now it is time to break these options down in detail:

      a. timeseries_timezone

      This option is used to configure what time zone is used for
      the 'timeseries' data model. Currently only 'local' or
      'utc' is supported.

      Example:

      ```JSON
      { "...": "...", "timeseries_timezone": "local" }
      ```

      b. legend_entries

      The legend_entries options is a variable sized array
      defining arbitrary entries that should be added to the chart
      legend. This is meant to provide a convenient method
      through which comments can easily be added to a chart.

      Example:

      ```JSON
      { "...": "...", "legend_entries": [ "entry #1", "entry #2" ] }
      ```

      c. plotfiles[]

      A plot file is the original data file supported by jschart
      and originally comes from multiple generations of charting
      programs that predated jschart. The plot file format is
      extremely simple, it consists of a header row which defines
      the data series name and then rows of value pairs which are
      typically X/Y pairs. It looks like this:

      ```
      #LABEL:data series name
      5 0
      10 2
      15 8
      20 3
      25 1
      ```

      In most cases the file consisted of X axis values which were
      the interval that a tool produced a sample, in the above
      example that interval is 5 seconds. The Y axis values are
      the arbitrary value produced by the tool for that interval's
      sample.

      The jschart library supports multiple plot files to be
      specified, so the plotfiles parameter is an arbitrarily
      sized array. It would be used like this in the options
      parameter:

      ```JSON
      { "plotfiles": [ "plotfiles/file1.plot", "plotfiles/file2.plot", "..." ] }
      ```

      d. plotfile

      The plotfile options is a simplified version of the
      plotfiles option which only supports a single plot file
      being supplied to the jschart library. It is most
      applicable when combined with the packed option which is
      discussed next.

      e. packed

      The packed option is optionally used in conjunction with the
      plotfile option. The original plotfile file format only
      supported a single data series, meaning multiple data series
      required multiple files. When jschart was written this
      demonstrated scalability issues in environments with very
      large data series counts. A modified version of the plot
      file format called a packed plot file was created which
      combined multiple plot files into a single file with
      delineations between each data series. It was a requirement
      that jschart know in advance the number of data series
      packed into the single file which is the point of this
      variable. Here is an example of how this option could be
      used and the accompanying plot file:

      ```JSON
      { "packed": 2, "plotfile": "plotfiles/2-packed.plot" }
      ```

      Contents of plotfiles/2-packed.plot:

      ```
      --- JSChart Packed Plot File V1 ---
      #LABEL:data series 1
      5 10
      10 9
      15 11
      20 13
      25 7
      --- JSChart Packed Plot File V1 ---
      #LABEL:data series 2
      5 8
      10 9
      15 5
      20 6
      25 4
      ```

      f. csvfiles[]

      The csvfiles parameter is an arbitrarily sized array that
      points to one or more CSV formatted data files. CSV file
      support was added to jschart when it was adopted by pbench
      in order to handle the data files that pbench was already
      producing. The CSV file format support is similar to the
      plot file format support, yet still different. The csvfiles
      option is an abitrary array like the plotfiles options but
      since a CSV file can include multiple datasets there is no
      hackish entity like the packed plot file. A chart can be
      populated with one or more CSV files and each CSV file can
      have one or more data series in it.

      The jschart library understands two different CSV file
      formats which can be briefly described by the following
      examples:

      i. ts,d0,d1,d2,...,dN
      ii. ts0,d0,ts1,d1,ts2,d2,...,tsN,dN

      In the first format each data sample row has a single
      timestamp with an interval sample for each data series at
      that timestamp. In practice, this looks like the following:

      ```
      timestamp_ms,data series 1,data series 2
      1461027782000,0,5
      1461027783000,4,1
      ```

      The timestamps are in milliseconds since the epoch.

      The second format has individual timestamps for each data
      series sample, even those on the same row of the file. This
      could look something like the following:

      ```
      timestamp_data_series_1_ms,data series 1,timestamp_data_series_2_ms,data series 2
      1461027782000,0,1461027782500,5
      1461027783000,4,1461027783500,1
      ```

      Using the csvfiles option to jschart would look something
      like this:

      ```JSON
      { "csvfiles": [ "data-files/samples.csv" ] }
      ```

      g. json_plotfile

      The json_plotfile allows jschart to use JSON formatted data
      files. Since it is JSON the file format is fairly dynamic,
      but there are some basic assumptions that must be met. The
      JSON output should be based on the following:

      ```JSON
      {
        "x_axis_series": "string",
        "data_series_names": [],
        "data": []
      }
      ```

      The 'data_series_name' and 'data' properties are arrays
      which share the same indexes. The 'x_axis_series' property
      defines which entry in the 'data_series_names' array
      contains the X axis value of the X/Y pairs for each dataset.
      In practice this would look something like this:

      ```JSON
      {
        "x_axis_series": "time",
        "data_series_names": [ "time", "data series 1", "data series 2" ],
        "data": [ 
          [ 1461027782000, 0, 1],
          [ 1461027783000, 4, 5] 
        ]
      }
      ```

      Currently an assumption is made that the JSON output is used
      for a 'timeseries' data model and the X axis values are
      expected to be in milliseconds since the epoch.

      It should be noted that the JSON features of jschart have
      had limited usage at this time and could probably be
      improved upon if required.

      h. json_args    
      i. update_interval    
      j. history_length   

      These three options are only used in conjunction with the
      json_plotfile option, and most often all together (although
      update_interval and history_length may not be required).

      The json_args option defines post data that is sent to the
      HTTP server when requesting the data pointed to by
      json_plotfile. Typically this would be used to tell the
      HTTP server what data is being requested if json_plotfile
      refers to a URL whose response is dynamically generated.
      For example:

      ```JSON
      { "json_plotfile": "http://some.server.somewhere", "json_args": "type=foo" }
      ```

      In this example, supplying different values for 'type' could
      alter the response that the server sends depending on its
      implementation.

      The update_interval options tells the jschart library that
      the data being requested is dynamic and should be
      re-requested periodically on the defined interval. This is
      typically used for pseudo realtime data monitoring. After
      the initial request is made, subsequent requests are made
      every update_interval number of seconds. These additional
      requests will include any json_args that were provided and
      will additionally add a 'time=timestamp' entry to the post
      data so that the server can try to optimize the transfer by
      only sending new samples since timestamp and avoid
      retransmission of existing data.

      The history_length parameter tells the jschart library how
      many data samples should be retained when new data is being
      dynamically added. This prevents the arrays that contain
      the sample data from growing without bounds which would
      eventually cause a memory related issue.

      All combined, these parameters could be used like this:

      ```JSON
      { 
        "json_plotfile": "http://some.server.somewhere", 
        "json_args": "type=foo", 
        "update_interval": 5, 
        "history_length": 300
      }
      ```

      This example would request the available data every 5
      seconds and maintain a history of 300 samples.

      k. json_object

      The json_object allows jschart to use JSON formatted data
      objects. The JSON object should be based on the following:

      ```JSON
      {
        "json_object": {
          "x_axis_series": "time",
          "data_series_names": [ "time", "data series 1", "data series 2" ],
          "data": [ 
            [ 1461027782000, 0, 1],
            [ 1461027783000, 4, 5] 
          ]
        }
      }
      ```

      l. raw_data_sources[]

      The raw_data_sources option is an arbitrarily sized array
      that contains links that should be appended to the table
      associated with each chart. This is typically used to
      provide a way to access the raw tool output that the charted
      data was generated with, hence the name.

      Example:

      ```JSON
      { 
        "csvfiles": [ "data-files/processed.csv" ], 
        "raw_data_sources": [ "data-files/tool1.out", "data-files/tool2.out" ] 
      }
      ```

      m. threshold

      The threshold option defines a valåue which is compared
      against the maximum Y axis value for each dataset. If the
      threshold value is larger than the dataset's value then that
      dataset is automatically hidden by default. This provides a
      mechanism which is used to filter out noise from tools that
      produce large numbers of datasets. At run time the user can
      achieve the same functionality through the UI and also
      apply the threshold against the dataset average instead of
      its maximum value. The UI controls do not require that any
      options be provided in the code.

      Example:

      ```JSON
      { "...": "...", "threshold": 5 }
      ```

      n. sort_datasets

      The sort_datasets option is a boolean value that determines
      the order in which datasets are presented to the user. By
      default sort_datasets is enabled, unless live_update is used
      (this is due to the requirement of consistent ordering
      between the existing and new sample data). If sort_datasets
      is disabled by setting it to false then datasets are
      presented in the order they are supplied to the library
      (note: this was the default behavior prior to the addition
      of sort_datasets).

      Example:

      ```JSON
      { "...": "...", "sort_datasets": false }
      ```

      o. x_min    
      p. x_max    
      q. y_min    
      r. y_max    

      These four options control the default axes domain of the
      chart view port. There are many different reasons for doing
      this but the most common is probably to set a strict range
      for a known set of values, such as a CPU usage graph which
      will be a percentage between 0 and 100.

      Example:

      ```JSON
      { "...": "...", "y_min": 0, "y_max": 100 }
      ```

      s. x_log_scale    
      t. y_log_scale    

      These two options are boolean values that control whether or
      not the corresponding axis scale should be presented with a
      logarithmic scale (instead of the default linear scale).
      The one exception to this is if the 'timeseries' data model
      is used, in that case the x_log_scale option is ignored.

      Example:

      ```JSON
      { "...": "...", "y_log_scale": true }
      ```

      u. scatterplot

      The scatterplot option is a boolean value that changes the
      chart from a traditional line graph to scatterplot where
      only the individual data points of a series are visible
      without a line connecting them. This option only makes
      sense for non-stacked charts.

      Example:

      ```JSON
      { "...": "...", "scatterplot": true }
      ```

- finish_page()

  This method does some simple page manipulation to signal that chart
  loading is complete.  It changes the page's background color and makes
  a log entry on the console.

- chart_reload_options(`location`, `options`)

  This method allows the developer to reload the chart options in order
  to change datasets or other chart behavior.  The parameters are the
  same as in create_jschart.

- chart_set_title(`location`, `chart title`)

  This method allows the developer to change a chart's title.  The
  parameters are the same as in create_jschart.

- chart_set_x_axis_label(`location`, `x axis title`)
- chart_set_y_axis_label(`location`, `y axis title`)

  These methods allow the developer to change the titles/labels of a
  chart's axes.  The parameters are the same as in create_jschart.
