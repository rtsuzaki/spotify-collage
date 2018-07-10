import React from 'react';
import { connect } from 'react-redux';
import { VictoryRadar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

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



class ConnectedRadarChart extends Reac.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(characterData),
      maxima: this.getMaxima(characterData)
    }
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      // this originally found what the maxima would be for each key
      // I knew all of my maximums were 5, so I set it so
      memo[key] = 1;
      return memo;
    }, {});
  }
  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }



  render() {
    <VictoryChart polar theme={VictoryTheme.material}>
      <VictoryPolarAxis dependentAxis
        style={{ axis: {stroke: "none" } }}
        tickFormat={() => null}
      />
      <VictoryPolarAxis/>
      <VictoryArea
        data={props.danceability}
        style={{
          data: { fill: "#c43a31" },
        }}
      />
    </VictoryChart>
  }
}

const RadarChart = connect(mapStateToProps)(ConnectedRadarChart);

export default RadarChart;
