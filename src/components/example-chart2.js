

import React, {Component} from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries,
  AreaSeries,
  ChartLabel
} from 'react-vis';

import ShowcaseButton from './showcase-button'




export default class ExampleChart2 extends Component {

constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'animal',
      alpha: 'Reject',
      colorType: 'all',
      index: null
    };
  }
  render() {

    const colorRanges = {first: ['red','red'], second: ['red','teal']}
    const next = {first: 'rejections', second: 'all'}


    const {value, keyOfInterest, colorType, index} = this.state;

    const {data} = this.props;
    const dataWithColor = data.map((d, i) => ({...d, color: (d.x > 0.1) ? Number(d.x) : Number(i !== index)}));
    const datatest = data.filter(d => d.x <= 0.1);
    const datatest2 = data.filter(d => d.x > 0.1)
    console.log(datatest);

    //const dataOut = first ? dataWithColor : datatest;

    const ydomain = data.reduce((e,f) => { return {max: Math.max(e.max, Number(f.y)),
    min: Math.min(e.min,Number(f.y))}}, {max: -Infinity, min: Infinity});

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
    <div className="main-phack">
     <XYPlot xType="ordinal" width={500} height={500}  ydomain={[ydomain.min, ydomain.max]}
     colorType = 'category'
     colorDomain = {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
     colorRange = {['red','teal', 'teal', 'teal', 'teal', 'teal', 'teal', 'teal', 'teal', 'teal']}
     onMouseLeave={() => this.setState({ index: null })}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <ChartLabel
    text="P-Value"
    includeMargin={false}
    xPercent={0.5}
    yPercent={1.1}
    style={axisStyle}
    />

    <ChartLabel
    text="Frequency"
    className="alt-y-label"
    includeMargin={false}
    xPercent={-0.07}
    yPercent={0.5}
    style={{
      transform: 'rotate(-90)',
      textAnchor: 'end'
    }}
    />

          <YAxis />
          <VerticalBarSeries data={dataWithColor}
          onNearestX={(d, { index }) => this.setState({ index })}
          onSeriesClick={(event) => alert(event.event.target._currentElement)}
        />

          <LabelSeries data={data} getLabel={d => ""} />
        </XYPlot>
     </div>
    );
  };
}

