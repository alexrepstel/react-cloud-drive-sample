import React from 'react';
import { Button} from 'react-bootstrap';
import UploadContainer from '../Drive/UploadContainer';


class FileUploadPopup extends React.Component {


    constructor(props){
        super(props);

    }


  render() {

    return (
      <div className='popup'>
        <div className='popup_inner_upload'>
        <UploadContainer currentFolderId={this.props.currentFolderId}></UploadContainer>
        <Button className="upload-popup-cancel-button" onClick={ () => {this.props.closePopup(); this.props.reRenderFolders(this.props.currentFolderId);} }>Close</Button>
        </div>
      </div>
    );
  }
}


export default FileUploadPopup;