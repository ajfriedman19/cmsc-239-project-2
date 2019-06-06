import React, {Component} from 'react';
import {aggregateByCommunityAndMonths} from '../utils'
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
      goal: 'POPULATION',
      value: false,
      keyOfInterest: 'COMMUNITY AREA NAME'
    };
  }

  render() {
    const {goal, value, keyOfInterest} = this.state;
    const {data} = this.props;
    console.log('aggregating by community and month ranges...');
    const kwhByCommunityAndMonths = aggregateByCommunityAndMonths(data, 1, 12);
    console.log(kwhByCommunityAndMonths);
    
    var dictPreppedData = [];
    var preppedData = [];

    if (goal === 'POPULATION') {
      preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
        return {key, size: values.length};
      })
      dictPreppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
        return {title: key, color: '#000000', size: values.length, style: {'border': 'thin solid white'}};
      });
    } else {
      var container = [];
      for (var i = 0; i < Object.keys(kwhByCommunityAndMonths).length; i ++) {
        let name = Object.keys(kwhByCommunityAndMonths)[i];
        container.push({title: name, color: '#000000', size: kwhByCommunityAndMonths[name], style: {'border': 'thin solid white'}});
      }
      dictPreppedData = container;
    }
    const dictTreemap = {
      'title': 'analytics',
      'color': '#12939A',
      'children': [{'title': 'cluster', 'children': dictPreppedData}]
    };
    return (
      <div>
        <Treemap 
         title={'Treemap'}
         width={1500}
         height={400}
         color={'#12939A'}
         data={dictTreemap}
        />
        <p> How are Chicago's buildings distributed by geography, type, age, and household size? </p> 
        {['COMMUNITY AREA NAME', 'BUILDING TYPE', 'AVERAGE BUILDING AGE ROUNDED', 'AVERAGE HOUSESIZE ROUNDED'].map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({goal: 'POPULATION', keyOfInterest: key})}
            >{key}</button>);
        })}
        <br/> <p> How is Chicago's electricity usage distributed geographically? </p> 
        {['ELECTRICITY CONSUMPTION'].map(key => {
          return (<button
            key={'AGGREGATE CONSUMPTION OF ELECTRICITY: BY COMMUNITY (JAN 2010 - DEC 2010)'}
            onClick={() => this.setState({goal: 'ELECTRICITY', keyOfInterest: key})}
            >{key}</button>);
        })}<br/><br/><br/><br/><br/><br/>

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
            onClick={() => this.setState({goal: 'POPULATION', keyOfInterest: key})}
            >{key}</button>);
        })}
      </div>
    );
  }
}

