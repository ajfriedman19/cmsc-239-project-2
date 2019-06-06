import React, {Component} from 'react';

//import Histogram from 'react-chart-histogram';


import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';

export default class ExampleChart2 extends Component {
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
   // const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
    //  return {key, size: values.length};
    //});
    const labels = data.map(a => a.index);
    const rawdata = data.map(a => a.pvalue);
    const options = { fillColor: 'red', strokeColor: 'black'};
    const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
  <Histogram
    width={parentWidth}
    height={parentHeight}
    {...rest}
  />
))

    return (
      <div>
        <ResponsiveHistogram
          ariaLabel = "test"
          orientation = 'vertical'
          cumulative={false}
          normalized={false}
          binCount={25}
          valueAccessor={d => d}
          binType='numeric'
          renderTooltip={({ event, datum, data, color }) => (
          <div>
            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
            <div><strong>count </strong>{datum.count}</div>
            <div><strong>cumulative </strong>{datum.cumulative}</div>
            <div><strong>density </strong>{datum.density}</div>
          </div>
        )}
        >
         <BarSeries
          animated
          rawdata={rawdata}
        />
        </ResponsiveHistogram>
      </div>
    );
  }
}
