import React from 'react';
import { connect } from "react-redux";
import { VictoryPie, VictoryGroup, VictoryTheme, VictoryLabel } from 'victory';

const mapStateToProps = state => {
  return { keysData: state.keysData };
};

const ConnectedPieChart = (props) => {
  return (
    <div id="victoryPieContainer">
      <VictoryGroup theme={VictoryTheme.material}>
        <VictoryPie
          
          width={400} height={400}
          data={[
            { x: "C", y: props.keysData[0] },
            { x: "C♯", y: props.keysData[1] },
            { x: "D", y: props.keysData[2] },
            { x: "D♯", y: props.keysData[3] },
            { x: "E", y: props.keysData[4] },
            { x: "F", y: props.keysData[5] },
            { x: "F♯", y: props.keysData[6] },
            { x: "G", y: props.keysData[7] },
            { x: "G♯", y: props.keysData[8] },
            { x: "A", y: props.keysData[9] },
            { x: "A♯", y: props.keysData[10] },
            { x: "B", y: props.keysData[11] }
          ]}
          innerRadius={50} labelRadius={135}
          style={{ labels: { fill: "red", fontSize: 20 } }}
          // padding={50}
        />
        <VictoryLabel text={'Keys of Songs'} x={138} y={175} />
      </VictoryGroup>
    </div>
  )
}

const PieChart = connect(mapStateToProps)(ConnectedPieChart);

export default PieChart;