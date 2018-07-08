import React from 'react';
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

const mapStateToProps = state => {
  return { currentTracksData: state.currentTracksData };
};

class ConnectedBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      total: 0,
    }

  }
  componentDidMount() {
    this.setBarChartData();
  }

  setBarChartData() {
    // Sort data into 10% increments
    const chartCount = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
    }
    let total = 0;
    this.props.currentTracksData.forEach((track) => {
      const trackData = Math.round(track[this.props.dataType]*10);
      chartCount[trackData].push(track[this.props.dataType]*10);
      total += track[this.props.dataType]*100;
    })
    this.setState({
      chartData: chartCount,
      total: total,
    });
  }

  render() {
    var data = [];
    if (this.state.chartData) {
      for (let i = 0; i <= 10; i += 1) {
        data.push({[this.props.dataType]: i, NumberOfSongs: this.state.chartData[i].length});
      }
    }

    return (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material} style={{ parent: { maxWidth: "33%" } }}>
        <VictoryAxis
          tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          tickFormat={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90' ,'100']}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => x}
        />
        <VictoryLabel angle={-90} text={'# of Songs in Playlist'} x={5} y={175} textAnchor="middle"/>
        <VictoryLabel text={`${this.props.dataType} Rating`} x={175} y={340} textAnchor="middle"/>

        {/* Chart label for average value, cutting off excess decimal places */}
        <VictoryLabel text={`Average ${this.props.dataType}=${(this.state.total/this.props.currentTracksData.length).toFixed(2)}`} x={175} y={50} textAnchor="middle"/>
        
        <VictoryBar
          data={data}
          x={(this.props.dataType)}
          y="NumberOfSongs"
        />
      </VictoryChart>
    )
  } 
}

const BarChart = connect(mapStateToProps)(ConnectedBarChart);

export default BarChart;
