import React, {Component} from 'react';

import {RadialChart, Hint, XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, MarkSeries} from 'react-vis';
import {tTestText} from '../utils.js';
import {aggregateByCommunityFormat} from '../utils'


function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

function updateVal(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class HackingChart extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterestHacking: 'TOTAL POPULATION',
      min: 1,
      max: 12,
      pValue: false,
      log: 1
    };
  }

  render() {
    const {value, keyOfInterestHacking, max, min, pValue, log} = this.state;
    const {data} = this.props;
    console.log("test1", data)
    const preppedData1 = aggregateByCommunityFormat(data, min, max, keyOfInterestHacking, log);
    console.log("test", preppedData1)
    const preppedData = Object.entries(groupBy(data, keyOfInterestHacking)).map(([key, values]) => {
      const new_val = values.length / 5
      return {key, x: values.length, y: new_val};
    });
    console.log("test2", preppedData)
    const tText = tTestText(preppedData1,2)

    return (
      <div className="main-phack">
        <h2>{tText}</h2>
        <XYPlot width={600} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Total Occupation" style={{title: {fill: 'black', fontWeight: 600}}}/>
          <YAxis title="Average KiloWatts Per Hour" style={{title: {fill: 'black', fontWeight: 600}}}/>
          <MarkSeries
            className="mark-series-example"
            strokeWidth={3}
            opacity="0.7"
            data={preppedData1}
            onValueMouseOver={v => this.setState({value: v})}
            onSeriesMouseOut={v => this.setState({value: false})}
          />
          {value !== false && <Hint value={value} />}
        </XYPlot>
          <div>
            <p>TESTING</p>
            <div>
              {['TOTAL POPULATION', 'OCCUPIED UNITS PERCENTAGE', 'AVERAGE HOUSESIZE ROUNDED'].map(key => {
              return (<button
                key={key}
                onClick={() => this.setState({keyOfInterestHacking: key})}
                >{key}</button>);
              })}
            </div>
            <p>Log or Actual Y Values</p>
            <div>
              {['ACTUAL Y VALUES', 'LOG Y VALUES'].map((key, ith) => {
              return (<button
                key={key}
                onClick={() => this.setState({log: ith})}
                >{key}</button>);
              })}
            </div>
          </div>

          <div>
            {<p>Min Month</p>}
            {<p></p>}
            {<p> Month to start aggregating electricity use: </p>}
            {<input id="min-input" value={this.state.min} onChange={() => this.setState({min: document.getElementById('min-input').value})}/>}
            {<p> Month to stop aggregating electricity use: </p>}
            {<input id="max-input" value={this.state.max} onChange={() => this.setState({max: document.getElementById('max-input').value})}/>}
          </div>
      </div>

    );
  }
}