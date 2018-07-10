import React from 'react';
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import { log } from 'util';

const mapStateToProps = state => {
  return { 
    currentTracksData: state.currentTracksData,
    danceability: state.danceability,
    energy: state.energy,
    acousticness: state.acousticness,
    instrumentalness: state.instrumentalness,
    valence: state.valence,
    speechiness: state.speechiness,
   };
};

const ConnectedBarChart = (props) => {
  var data = [];
  if (props[props.dataType]) {
    for (let i = 0; i <= 10; i += 1) {
      data.push({[props.dataType]: i, NumberOfSongs: props[props.dataType][i].length});
    }
  }
  return (
    <VictoryChart domainPadding={20} animate={{duration: 500}} theme={VictoryTheme.material} style={{ parent: { maxWidth: "33%" } }}>
      <VictoryAxis
        label={`${props.dataType} rating`}
        style={{axisLabel: {fontSize: 18, padding: 30}}}
        tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        tickFormat={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90' ,'100']}
      />
      <VictoryAxis
        dependentAxis
        label={'# of Songs in Playlist'}
        style={{axisLabel: {fontSize: 18, padding: 30}}}
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => x}
      />
      {/* <VictoryLabel angle={-90} text={'# of Songs in Playlist'} x={5} y={175} textAnchor="middle"/> */}
      {/* <VictoryLabel text={`${props.dataType} Rating`} x={175} y={340} textAnchor="middle"/> */}

      {/* Chart label for average value, cutting off excess decimal places */}
      <VictoryLabel text={`Average ${props.dataType}=${(((props[props.dataType]).total)/((props[props.dataType]).numberOfTracks)).toFixed(2)}`} x={175} y={50} textAnchor="middle"/>
      
      <VictoryBar
        
        data={data}
        x={props.dataType}
        y="NumberOfSongs"
        style={{ data: { fill: props.color } }}
      />
    </VictoryChart>
  )
}

const BarChart = connect(mapStateToProps)(ConnectedBarChart);

export default BarChart;
