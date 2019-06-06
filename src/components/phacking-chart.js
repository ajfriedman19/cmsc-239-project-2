import React, {Component} from 'react';

import {RadialChart, Hint, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries} from 'react-vis';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class ExampleChart1 extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'animal'
    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
      const new_val = values.length / 5
      return {key, x: values.length, y: new_val, size: 10};
    });
    return (
      <XYPlot width={600} height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <MarkSeries
          animation
          className="mark-series-example"
          strokeWidth={3}
          opacity="0.7"
          data={preppedData}
        />
        <MarkSeries
          className="mark-series-example"
          strokeWidth={3}
          opacity="0.7"
          data={preppedData}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
        />
        {value !== false && <Hint value={value} />}
      </XYPlot>
    );
  }
}
