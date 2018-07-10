import React from 'react';
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryTooltip, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

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
  var descriptions = {
    danceability: `Danceability describes how suitable a track\nis for dancing based on a combination \nof musical elements including tempo, rhythm \nstability, beat strength, and overall regularity. \nA value of 0 is least danceable and 100 is most danceable.`,
    energy: 'Energy is a measure from 0 to 100 and \nrepresents a perceptual measure of intensity\n and activity. Typically, energetic tracks feel fast, loud, and \nnoisy. For example, death metal has high energy, \nwhile a Bach prelude scores low on the scale. \nPerceptual features contributing to this attribute include \ndynamic range, perceived loudness, timbre, \nonset rate, and general entropy.',
    acousticness:'A confidence measure from 0 to 100 of \nwhether the track is acoustic. 100 represents\n high confidence the track is acoustic.',
    instrumentalness: 'Predicts whether a track contains no \nvocals. “Ooh” and “aah” sounds are treated as instrumental \nin this context. Rap or spoken word tracks are \nclearly “vocal”. The closer the instrumentalness value \nis to 100, the greater likelihood the track contains no \nvocal content. Values above 50 are intended to \nrepresent instrumental tracks, but confidence is \nhigher as the value approaches 100.',
    valence: 'A measure from 0 to 100 describing the musical \npositiveness conveyed by a track. Tracks with \nhigh valence sound more positive (e.g. happy, cheerful, \neuphoric), while tracks with low valence sound more \nnegative (e.g. sad, depressed, angry).',
    speechiness: 'Speechiness detects the presence of \nspoken words in a track. The more exclusively speech-like \nthe recording (e.g. talk show, audio book, poetry), the \ncloser to 100 the attribute value. '
  }  
  var data = [];
  if (props[props.dataType]) {
    for (let i = 0; i <= 10; i += 1) {
      data.push({[props.dataType]: i, NumberOfSongs: props[props.dataType][i].length, label: descriptions[props.dataType]});
    }
  }
  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material} style={{ parent: { maxWidth: "33%" } }}>
      <VictoryAxis
        label={`${props.dataType} rating`}
        style={{axisLabel: {fontSize: 18, padding: 30}}}
        tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        tickFormat={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90' ,'100']}
      />
      <VictoryAxis
        dependentAxis
        label={'Number of Songs'}
        style={{axisLabel: {fontSize: 22, padding: 30}}}
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => x}
      />
      {/* <VictoryLabel angle={-90} text={'# of Songs in Playlist'} x={5} y={175} textAnchor="middle"/> */}
      {/* <VictoryLabel text={`${props.dataType} Rating`} x={175} y={340} textAnchor="middle"/> */}

      {/* Chart label for average value, cutting off excess decimal places */}
      <VictoryLabel text={`Average ${props.dataType}=${(((props[props.dataType]).total)/((props[props.dataType]).numberOfTracks)).toFixed(2)}`} x={175} y={50} textAnchor="middle"/>
      
      <VictoryBar
        labelComponent={<VictoryTooltip/>}
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
