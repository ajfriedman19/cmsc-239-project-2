import React, {Component} from 'react';

import {RadialChart, Hint, Treemap} from 'react-vis';
import ShowcaseButton from './showcase-button';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export class ExampleChart extends Component {
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
    const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
      return {key, size: values.length};
    });
    return (
      <div>
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
        {Object.keys(data[0]).map(key => {
          return (<button
            key={key}
            onClick={() => this.setState({keyOfInterest: key})}
            >{key}</button>);
        })}
      </div>
    );
  }
}

function _getRandomData(total) {
  const totalLeaves = total || Math.random() * 20;
  const leaves = [];
  for (let i = 0; i < totalLeaves; i++) {
    leaves.push({
      name: total ? total : String(Math.random()).slice(0, 3),
      size: Math.random() * 1000,
      color: Math.random(),
      style: {
        border: 'thin solid red'
      }
    });
  }
  return {
    title: '',
    color: 1,
    children: leaves
  };
}
// example taken from uber and will be overwriteen with the merge 
export class DynamicTreemapExample extends React.Component {
  state = {
    hoveredNode: false,
    treemapData: _getRandomData(20),
    useCirclePacking: false
  };

  render() {
    const {hoveredNode, useCirclePacking} = this.state;
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({hoveredNode: x}),
      onLeafMouseOut: () => this.setState({hoveredNode: false}),
      onLeafClick: () => this.setState({treemapData: _getRandomData()}),
      height: 300,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
      width: 350
    };
    return (
      <div className="dynamic-treemap-example">
        <ShowcaseButton
          onClick={() => this.setState({useCirclePacking: !useCirclePacking})}
          buttonContent={'TOGGLE CIRCLE PACK'}
        />
        <Treemap {...treeProps} />
        click above to the update data {hoveredNode && hoveredNode.value}
      </div>
    );
  }
}
