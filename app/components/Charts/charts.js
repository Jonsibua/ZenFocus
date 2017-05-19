import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RangeSlider } from '@blueprintjs/core';
import LineGraph from '../common/LineGraph';
import {
  getDate
} from '../../utils/date.util';

export default class Charts extends PureComponent {
  constructor() {
    super();
    this.onResizeWindow = () => this.forceUpdate();
    this.state = {
      range: [1, 30]
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResizeWindow);
  }

  componentDidMount() {
    const { loadChartData } = this.props;
    loadChartData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow);
  }

  onSliderChange(range) {
    this.setState({ range });
  }

  render() {
    let { data } = this.props;
    const { range } = this.state;

    const defaultData = [{
      date: getDate,
      focusLength: 0,
      shortBreakLength: 0,
      rounds: 0,
    }];

    data = data.slice(Math.abs(data.length - 30) * -1);
    data = data.slice(range[0] - 1, range[1]);

    return (
      <div className="charts container-fluid vh-100 bg-dark-gray-5">
        <LineGraph data={data.length < 1 ? defaultData : data} />
        <RangeSlider
          min={1}
          max={30}
          value={range}
          onChange={(val) => this.onSliderChange(val)}
          className="mt-5"
        />
      </div>
    );
  }
}

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    focusLength: PropTypes.number,
    shortBreakLength: PropTypes.number,
    longBreakLength: PropTypes.number,
    rounds: PropTypes.number
  })).isRequired,
  loadChartData: PropTypes.func.isRequired
};
