import React from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const ConnectedUserGreeting = (props) => {
  return (
    <li className="playlistNav-li">
    {props.currentUser && props.currentUser.images ?
      (<div id="userGreeting">
        <img src={props.currentUser.images[0].url} style={{ height: 50}} id='avatar'/>
        <div>{props.currentUser.display_name}</div>
      </div>) : null
    }
    </li>

  )
}

const UserGreeting = connect(mapStateToProps)(ConnectedUserGreeting);

export default UserGreeting;