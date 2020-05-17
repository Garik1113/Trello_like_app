import React from "react";
import { connect } from "react-redux";
import { addImageToCard } from "../../actions/cardActions";

class AddAtachment extends React.Component {
  render() {
    return (
      <div className='card-add-attachment-wrapper'>
        <h4 className='text-center mt-2'>Add Attachment</h4>
        <hr />
        <label htmlFor='file' className='add-image-label'>
          Add image
        </label>
        <input
          type='file'
          id='file'
          name='image'
          className='add-image-input'
          onChange={(e) => {
            this.props.addImageToCard(this.props.card_id, e.target.files);
            this.props.closeAttachmentWindow();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { addImageToCard })(AddAtachment);
