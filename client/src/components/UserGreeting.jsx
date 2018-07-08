import React from 'react';

const UserGreeting = (props) => {
  return (
    <div >
    {props.currentUser && props.currentUser.images ?
      (<div id="userGreeting">
        <img src={props.currentUser.images[0].url} style={{ height: 50 }}/>
        <div>{props.currentUser.display_name}</div>
      </div>) : null
    }
    </div>

  )
}

export default UserGreeting;