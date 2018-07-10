import React from 'react';
import { connect } from "react-redux";
import { VictoryPie, VictoryGroup, VictoryTooltip, VictoryLegend, VictoryTheme, VictoryLabel } from 'victory';

const mapStateToProps = state => {
  return { keysData: state.keysData };
};

const ConnectedPieChart = (props) => {
  return (
    <div id="victoryPieContainer">
      {/* <VictoryLegend x={1} y={10}
        borderPadding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        width={500} height={100}
        title="Legend"
        centerTitle
        orientation="horizontal"
        // gutter={20}
        style={{ border: { stroke: "black" }, title: {fontSize: 20 }}}
        data={[
          { name: "C", symbol: { fill: "tomato"} },
          { name: "C♯", symbol: { fill: "orange" } },
          { name: "D", symbol: { fill: "gold" } },
          { name: "D♯", symbol: { fill: "gold" } },
          { name: "E", symbol: { fill: "gold" } },
          { name: "F", symbol: { fill: "gold" } },
          { name: "F♯", symbol: { fill: "gold" } },
          { name: "G", symbol: { fill: "gold" } },
          { name: "G♯", symbol: { fill: "gold" } },
          { name: "A", symbol: { fill: "gold" } },
          { name: "A♯", symbol: { fill: "gold" } },
          { name: "B", symbol: { fill: "gold" } }
        ]}
      /> */}
      <VictoryGroup theme={VictoryTheme.material}>
        <VictoryPie
          // labelComponent={<VictoryTooltip/>}
          width={400} height={400}
          colorScale={['#2b4450']}
          data={[
            { x: "C", y: props.keysData[0], label: "C"},
            { x: "C♯", y: props.keysData[1], label:"C♯"},
            { x: "D", y: props.keysData[2], label:"D"},
            { x: "D♯", y: props.keysData[3], label:"D♯"},
            { x: "E", y: props.keysData[4], label:"E"},
            { x: "F", y: props.keysData[5], label:"F"},
            { x: "F♯", y: props.keysData[6], label:"F♯"},
            { x: "G", y: props.keysData[7], label:"G"},
            { x: "G♯", y: props.keysData[8], label:"G♯"},
            { x: "A", y: props.keysData[9], label:"A"},
            { x: "A♯", y: props.keysData[10], label:"A♯"},
            { x: "B", y: props.keysData[11], label:"B"}
          ]}
          innerRadius={50} labelRadius={135}
          style={{ labels: { fill: "#2b4450", fontSize: 20 } }}
          // padding={50}
        />
        <VictoryLabel text={'Keys of Songs\nBy Percentage'} x={138} y={175} />
      </VictoryGroup>
    </div>
  )
}

const PieChart = connect(mapStateToProps)(ConnectedPieChart);

export default PieChart;