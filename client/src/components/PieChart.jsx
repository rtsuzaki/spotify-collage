import React from 'react';
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

class PieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pieChartData: null,
    }
  }
  componentDidMount() {
    this.setPieChartData();
  }

  setPieChartData() {
    // Key values are integers representing the song's pitch. https://en.wikipedia.org/wiki/Pitch_class
    const chartCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    }
    this.props.currentTracksData.forEach((track) => {
      chartCount[track.key] += 1; 
    });
    this.setState({
      pieChartData: chartCount,
    });
  }

  render() {
    if (this.state.pieChartData) {
      return (
        <div id="victoryPieContainer">
          <VictoryPie
            // radius={50}
            data={[
              { x: "C", y: this.state.pieChartData[0] },
              { x: "C♯", y: this.state.pieChartData[1] },
              { x: "D", y: this.state.pieChartData[2] },
              { x: "D♯", y: this.state.pieChartData[3] },
              { x: "E", y: this.state.pieChartData[4] },
              { x: "F", y: this.state.pieChartData[5] },
              { x: "F♯", y: this.state.pieChartData[6] },
              { x: "G", y: this.state.pieChartData[7] },
              { x: "G♯", y: this.state.pieChartData[8] },
              { x: "A", y: this.state.pieChartData[9] },
              { x: "A♯", y: this.state.pieChartData[10] },
              { x: "B", y: this.state.pieChartData[11] }
            ]}
            labelRadius={175}
            style={{ labels: { fill: "red", fontSize: 14, fontWeight: "bold" } }}
            // padding={50}
          />
        </div>
      )
    } else {
      return <div> test</div>
    }
  }
}

export default PieChart;