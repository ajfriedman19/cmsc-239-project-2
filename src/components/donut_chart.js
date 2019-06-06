import React, {Component} from 'react';

import {RadialChart, Hint, Treemap} from 'react-vis';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class DonutChart extends Component {
  constructor() {
    super();
    this.state = {
      value: false,
      keyOfInterest: 'BUILDING TYPE'
    };
  }

  render() {
    const {value, keyOfInterest} = this.state;
    const {data} = this.props;
    const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
      return {key, size: values.length};
    })
    const dictPreppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
      return {title: key, color: '#000000', size: values.length};
    });
    const dictx = {
      'title': 'analytics',
      'color': '#12939A',
      'children': [{
        'title': 'cluster',
        'children': [dictPreppedData, dictPreppedData]
      }, {
        'title': 'group',
        'children': [dictPreppedData]
      }]
    };
    console.log(dictx);
    return (
      <div>
        <Treemap 
         title={'Treemap'}
         width={700}
         height={700}
         data={dictx}
        />

        <RadialChart
          animation
          innerRadius={100}
          radius={140}
          getAngle={d => d.size}
          data={preppedData}
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          width={300}
          height={300}
          padAngle={0.04}
        >
          {value !== false && <Hint value={value} />}
        </RadialChart>
        {['COMMUNITY AREA NAME', 'BUILDING TYPE'].map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: key})}
            >{key}</button>);
        })}
      </div>
    );
  }
}

