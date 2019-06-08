import React, {Component} from 'react';
import {aggregateByCommunityAndMonths, aggregateByCommunityAndIncome} from '../utils'
import {RadialChart, Hint, Treemap} from 'react-vis';
import {scaleLinear} from 'd3-scale';
import {hex} from 'd3-color';

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
      inputValueLower: 1,
      inputValueUpper: 12,
      goal: 'POPULATION',
      value: false,
      keyOfInterest: 'COMMUNITY AREA NAME'
    };
  }

  updateInputValueLower(evt) {
    this.setState({
      inputValueLower: evt.target.value
    })
  }

  updateInputValueUpper(evt) {
    this.setState({
      inputValueUpper: evt.target.value
    })
  }

  render() {
    const {goal, value, keyOfInterest} = this.state;
    const {data} = this.props;
    const kwhByCommunityAndMonths = aggregateByCommunityAndMonths(data, this.state.inputValueLower, this.state.inputValueUpper);
    console.log(kwhByCommunityAndMonths);
    console.log(this.state.inputValueUpper);
    const medianIncByCommunity = aggregateByCommunityAndIncome(data);
    const colorIncomeScale = scaleLinear().domain([20000,150000]).range(['#ffefd5','#ff8c00']);
    var dictPreppedData = [];
    var preppedData = [];

    if (goal === 'POPULATION') {
      preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
        return {key, size: values.length};
      })
      dictPreppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
        return {title: key, color: colorIncomeScale(medianIncByCommunity[key]), size: values.length, style: {'border': 'thin solid white'}};
      });
    } else {
      var container = [];
      for (var i = 0; i < Object.keys(kwhByCommunityAndMonths).length; i ++) {
        let name = Object.keys(kwhByCommunityAndMonths)[i];
        container.push({title: name, color: colorIncomeScale(medianIncByCommunity[name]), size: kwhByCommunityAndMonths[name], style: {'border': 'thin solid white'}});
      }
      dictPreppedData = container;
    }
    const dictTreemap = {
      'title': 'analytics',
      'color': '#12939A',
      'children': [{'title': 'cluster', 'children': dictPreppedData}]
    };
    return (
      <div className="main-phack">
        <Treemap 
         title={'Treemap'}
         width={1000}
         height={400}
         color={'#12939A'}
         data={dictTreemap}
         colorType={'literal'}
        />
        <p> <b> How many buildings are in each Chicago area? </b> Buildings are fairly evenly distributed across the city, although residential areas like Lakeview tend to have more buildings. There doesn't seem to be a pattern between building count and median income.</p>
        {['Find out building count by area'].map(key => {
          return (<button
            key={'COMMUNITY AREA NAME'}
            onClick={() => this.setState({goal: 'POPULATION', keyOfInterest: 'COMMUNITY AREA NAME'})}
            >{key}</button>);
        })}
        <br/> <p> <b> But how much electricity does each Chicago area consume? And over what months? </b> </p> 
        <p> Month to start aggregating electricity use: </p> <input value={this.state.inputValueLower} onChange={evt => this.updateInputValueLower(evt)}/> 
        <p> Month to stop aggregating electricity use: </p> <input value={this.state.inputValueUpper} onChange={evt => this.updateInputValueUpper(evt)}/> <br/><br/>
        {['Find out electricity use by area, over a particular window of months'].map(key => {
          return (<button
            key={'AGGREGATE CONSUMPTION OF ELECTRICITY: BY COMMUNITY (JAN 2010 - DEC 2010)'}
            onClick={() => this.setState({goal: 'ELECTRICITY', keyOfInterest: key})}
            >{key}</button>);
        })} <br/>
        <p> The Loop and Near North Side clearly dominate electricity usage. Interestingly, places with higher median income, tend to have higher electricity use (with the exception of the Loop).</p>
        <br/><br/><br/><br/><br/><br/>

      </div>
    );
  }
}

