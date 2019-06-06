// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';

function ShowcaseButton(props) {
  const {buttonContent, onClick} = props;
  return (
    <button className="showcase-button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}

<<<<<<< HEAD
import {Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis} from '@data-ui/histogram';

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
=======
ShowcaseButton.PropTypes = {
  buttonContent: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
>>>>>>> de488e50f1bf59dd306cb86b4417ba1ca705a12b

export default ShowcaseButton;