import React from 'react';
import { connect } from "react-redux";
import { VictoryPie, VictoryGroup, VictoryTheme, VictoryLabel } from 'victory';

const mapStateToProps = state => {
  return { currentTracksData: state.currentTracksData };
};

class ConnectedPieChart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   pieChartData: null,
    // }
  }
  // componentDidMount() {
  //   this.setPieChartData();
  // }

  // setPieChartData() {
  //   // Key values are integers representing the song's pitch. https://en.wikipedia.org/wiki/Pitch_class
  //   const chartCount = {
  //     0: 0,
  //     1: 0,
  //     2: 0,
  //     3: 0,
  //     4: 0,
  //     5: 0,
  //     6: 0,
  //     7: 0,
  //     8: 0,
  //     9: 0,
  //     10: 0,
  //     11: 0
  //   }
  //   this.props.currentTracksData.forEach((track) => {
  //     chartCount[track.key] += 1; 
  //   });
  //   this.setState({
  //     pieChartData: chartCount,
  //   });
  // }

  render() {
    const pieChartData = {
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
      pieChartData[track.key] += 1; 
    });

    if (pieChartData) {
      return (
        <div id="victoryPieContainer">
          <VictoryGroup theme={VictoryTheme.material}>
            <VictoryPie
             
              width={400} height={400}
              data={[
                { x: "C", y: pieChartData[0] },
                { x: "C♯", y: pieChartData[1] },
                { x: "D", y: pieChartData[2] },
                { x: "D♯", y: pieChartData[3] },
                { x: "E", y: pieChartData[4] },
                { x: "F", y: pieChartData[5] },
                { x: "F♯", y: pieChartData[6] },
                { x: "G", y: pieChartData[7] },
                { x: "G♯", y: pieChartData[8] },
                { x: "A", y: pieChartData[9] },
                { x: "A♯", y: pieChartData[10] },
                { x: "B", y: pieChartData[11] }
              ]}
              innerRadius={50} labelRadius={135}
              style={{ labels: { fill: "red", fontSize: 20 } }}
              // padding={50}
            />
            <VictoryLabel text={'Keys of Songs'} x={138} y={175} />
          </VictoryGroup>
        </div>
      )
    } else {
      return <div> test</div>
    }
  }
}

const PieChart = connect(mapStateToProps)(ConnectedPieChart);

export default PieChart;