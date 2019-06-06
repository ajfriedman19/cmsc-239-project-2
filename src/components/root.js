import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import ExampleChart2 from './example-chart2';
import ExampleChart3 from './example-chart3';
import {create_pairs} from '../utils.js';


const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

//console.log('hi');

  componentWillMount() {
    Promise.all([
    csv('data/Current_Employee_Names__Salaries__and_Position_Titles_new.csv'),
    csv('data/p-data.csv'),
    csv('data/chart2.csv'),
     ]).then(data => {
        this.setState({
          datavals: data[0],
          loading: false,
          chart2: data[2],
          pvals: data[1]
        });
        console.log(data[1]);
      });
  }


  render() {
    const {datavals, loading, chart2} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> Hello Explainable!</h1>
        <div>{`The example data was loaded! There are ${datavals.length} rows`}</div>
        <ExampleChart data={datavals}/>
        <div>{longBlock}</div>
        <ExampleChart2 data={pvals}/>
        <div>{longBlock}</div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
