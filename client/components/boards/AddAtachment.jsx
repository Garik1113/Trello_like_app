import React from "react";

export default class AddAtachment extends React.Component {
  render() {
    return (
      <div className='card-add-attachment-wrapper'>
        <h4 className='text-center mt-2'>Add Attachment</h4>
        <hr />
        <label htmlFor='file' className='add-image-label'>
          Add image
        </label>
        <input type='file' id='file' className='add-image-input' />
      </div>
    );
  }
}
