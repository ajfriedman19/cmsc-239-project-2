
import React, {Component} from 'react';

import {
  Hint,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
} from 'react-vis';

export default class ExampleChart3 extends Component {

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


    const axisStyle = {
    ticks: {
      fontSize: '14px',
      color: '#333'
    },
    title: {
      fontSize: '16px',
      color: '#333'
    }
  };


    return(
    <div className = "main-phack">
    <XYPlot width={500} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
   <XAxis
        title = "Number of Tests"
        style={axisStyle}/>
      <YAxis
        title = "Type 1 Error Rate"
        style = {axisStyle}
      />
      <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: '3px'
        }}
        lineStyle={{stroke: 'red'}}
        markStyle={{stroke: 'blue'}}
        data={data}
      />
      <LineMarkSeries
          animation
          className="mark-series-example"
          strokeWidth={3}
          opacity="0.7"
          data={data}
        />
        <LineMarkSeries
          className="mark-series-example"
          strokeWidth={3}
          opacity="0.7"
          data={data}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
        />
        {value !== false && <Hint value={value} />}
    </XYPlot>
    </div>
    );
  };
}
