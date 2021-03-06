import React, { useState } from 'react';
import _ from 'lodash';
import ShotChart from './ShotChart';
import CountSlider from './CountSlider';
import { Radio, Row, Col, Switch } from 'antd';

const RadioGroup = Radio.Group;

// Put count slider and sshot chart under the same parent component.
const DataViewContainer = props => {
  const [displayTooltip, setDisplayTooltip] = useState(true);
  const [chartType, setChartType] = useState('hexbin');
  const [minCount, setMinCount] = useState(2);

  const onCountSliderChange = newCount => {
    setMinCount(newCount);
  };
  const onChartTypeChange = event => {
    setChartType(event.target.value);
  };

  const onTooltipChange = newDisplayTooltip => {
    setDisplayTooltip(newDisplayTooltip);
  };

  return (
    <div className='data-view'>
      <ShotChart
        playerId={props.playerId}
        minCount={minCount}
        chartType={chartType}
        displayTooltip={displayTooltip}
      />
      <div className='filters'>
        {chartType === 'hexbin' ? (
          <CountSlider
            value={minCount}
            // count slider send back changed values to parent component
            // Lodash debounce function: after user slide the slider, wait for 500ms to
            //       // run the function. prevent user slides the slider too fast.
            onCountSliderChange={_.debounce(onCountSliderChange, 500)}
          />
        ) : null}
        <br />
        <Row>
          <Col span={9}>
            <RadioGroup onChange={onChartTypeChange} value={chartType}>
              <Radio value='hexbin'>Hexbin</Radio>
              <Radio value='scatter'>Scatter</Radio>
            </RadioGroup>
          </Col>
          <Col span={4}>
            <Switch
              checkedChildren='On'
              unCheckedChildren='Off'
              onChange={onTooltipChange}
              defaultChecked
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default DataViewContainer;

// import React from 'react';
// import _ from 'lodash';
// import { ShotChart } from './ShotChart';
// import CountSlider from './CountSlider';
// import { Radio, Row, Col, Switch } from 'antd';

// const RadioGroup = Radio.Group;

// // Put count slider and shot chart under the same parent component.
// export class DataViewContainer extends React.Component {
//   state = {
//     minCount: 2,
//     chartType: 'hexbin',
//     displayTooltip: true
//   };

//   onCountSliderChange = count => {
//     this.setState({ minCount: count });
//   };

//   // e corresponds to which radio chose by user
//   // setState to re-render the new change
//   onChartTypeChange = e => {
//     console.log(e.target.value);
//     this.setState({ chartType: e.target.value });
//   };

//   onTooltipChange = displayTooltip => {
//     console.log(displayTooltip);
//     this.setState({ displayTooltip });
//   };

//   render() {
//     console.log('render');
//     return (
//       <div className='data-view'>
//         <ShotChart
//           playerId={this.props.playerId}
//           minCount={this.state.minCount}
//           chartType={this.state.chartType}
//           displayTooltip={this.state.displayTooltip}
//         />
//         <div className='filters'>
//           {this.state.chartType === 'hexbin' ? (
//             <CountSlider
//               value={this.state.minCount}
//               // count slider send back changed values to parent component
//               // Lodash debounce function: after user slide the slider, wait for 500ms to
//               //       // run the function. prevent user slides the slider too fast.
//               onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
//             />
//           ) : null}
//           <br />
//           <Row>
//             <Col span={9}>
//               <RadioGroup
//                 onChange={this.onChartTypeChange}
//                 value={this.state.chartType}
//               >
//                 <Radio value='hexbin'>Hexbin</Radio>
//                 <Radio value='scatter'>Scatter</Radio>
//               </RadioGroup>
//             </Col>
//             <Col span={4}>
//               <Switch
//                 checkedChildren='On'
//                 unCheckedChildren='Off'
//                 onChange={this.onTooltipChange}
//                 defaultChecked
//               />
//             </Col>
//           </Row>
//         </div>
//       </div>
//     );
//   }
// }
