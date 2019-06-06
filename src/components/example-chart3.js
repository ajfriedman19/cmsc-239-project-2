import React, {Component} from 'react';

import LineChart from 'react-linechart';



export default class ExampleChart3 extends Component {
  constructor() {
    super();
    this.state = {
      value: false
      //keyOfInterest: 'animal'
    };
  }

  render() {
    const {value} = this.state;
    const {data} = this.props;
    return (
      <div>
        <LineChart width = {300} height = {300} data = {data[0]}/>
      </div>
    );
  }
}
