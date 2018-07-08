import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis,  VictoryTheme } from 'victory';




class BarChart extends React.Component {
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
      total += track[this.props.dataType]*10;
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
        data.push({danceability: i, numberOfSongs: this.state.chartData[i].length});
      }
    }

    return (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          tickFormat={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ,'10']}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x} Songs in Playlist`)}
        />
        <VictoryBar
          data={data}
          x="danceability"
          y="numberOfSongs"
        />
      </VictoryChart>
    )
  } 
}



export default BarChart;
