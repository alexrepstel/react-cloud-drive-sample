import React from 'react';
import { Button} from 'react-bootstrap';
import VersionListItem from '../popups/helper_comps/VersionListItem';
import UploadContainer from '../Drive/UploadContainer';
import axios from "axios";

class FileDetailsPopup extends React.Component {


    constructor(props){
        super(props);
        this.state = { 
            versions_files: []
      };
    }


    componentDidMount() {
        const options = {
          url: 'http://localhost:5000/driveAPI/getVersions',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data: {
            file_id: this.props.file_id
          }
        };
        
        axios(options)
          .then(response => {
            this.setState({
              versions_files: JSON.parse(response.request.response)
            });
          }); 
     }


  render() {
    const versions = this.state.versions_files.map(item => 
        <VersionListItem 
        version_key={item.version_key.toString()} 
        date={item.timestamp} 
        desc={item.description}
        >
    </VersionListItem> );

    // console.log(this.state.hello)

    var created_date_string = "";
    var modified_date_string = "";

    var createdDate = new Date(this.props.createdTS * 1000);
    created_date_string = createdDate.toGMTString();

    var modifiedDate = new Date(this.props.modifiedTS * 1000);
    modified_date_string = modifiedDate.toGMTString();

    return (
      <div className='popup'>
        <div className='popup_inner_file_details'>
        <h3>File Details:</h3>
        <div className="file-details-info">
        <p>Name: <b>{this.props.fileName}</b></p>
        <p>Type: <b>{this.props.fileType}</b></p>
        <p>Created on: <b>{created_date_string}</b></p>
        <p>File versions: </p>
        <div className="file-versions-list">
        {versions}
        </div>
        </div>
        <Button className="cancel-button-file-details" onClick={this.props.closePopup}>Cancel</Button>
        </div>
      </div>
    );
  
  }
}


export default FileDetailsPopup;