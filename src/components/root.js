import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import ExampleChart1 from './phacking-chart';
import ExampleChart3 from './example-chart3';
import ExampleChart2 from './example-chart2';
import DonutChart from './donut_chart';
import {create_pairs} from '../utils.js';
import {aggregateByCommunityAndMonths} from '../utils.js';


const introBlock = `
P-Hacking has been a major problem in ac
`;

const histogramBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const verticalBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const explainedBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const pvalOneBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const pvalTwoBlock = `
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

  componentWillMount() {
  Promise.all([
    csv('data/Current_Employee_Names__Salaries__and_Position_Titles_new.csv'),
    csv('data/p-data-new.csv'),
    csv('data/energy_usage.csv'),
    csv('data/p-data.csv'),
    csv('data/chart2.csv'),
     ]).then(data => {
        this.setState({
          datavals: data[0],
          loading: false,
          chart2: data[2],
          pvals: data[1]
        });
        console.log(aggregateByCommunityAndMonths(data[1], 1, 2));
      });
  }

  render() {
    const {loading, datavals, pvals, chart2} = this.state;
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">
        <h1> Hello Explainable! Im working on the Donut Chart. </h1>
        <h1> So You Think You Can Get Tenture!</h1>
        <div>{`The example data was loaded! There are ${datavals.length} rows`}</div>
        <div>{histogramBlock}</div>
        <ExampleChart3 data={chart2}/>
        <DonutChart data={datavals}/>
        <div>{verticalBlock}</div>
        <ExampleChart2 data={pvals}/>
        <div>{explainedBlock}</div>
        <ExampleChart data={datavals}/>
        <div>{pvalOneBlock}</div>
        <DonutChart data={datavals}/>
        <div>{pvalTwoBlock}</div>
        <ExampleChart1 data={datavals}/>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
