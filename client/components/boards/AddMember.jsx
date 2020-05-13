import React from "react";

export default class AddMembers extends React.Component {
  render() {
    return (
      <div className='card-add-member-wrapper'>
        <h4 className='text-center mt-2'>Members</h4>
        <hr />
        <input type='text' placeholder='Search members' />
      </div>
    );
  }
}
