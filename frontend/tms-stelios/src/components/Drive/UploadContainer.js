import React from 'react';
import Dropzone from './Dropzone';
import Progress from './Progress';
import UploaderIcon from '../img/upload_img.png';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import axios from "axios";

class UploadContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    // this.renderProgress = this.renderProgress.bind(this);
  
    }


    onFilesAdded(files) {
      // console.log(files);
        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
    }



    renderActions() {
        if (this.state.successfullUploaded) {
          return (
            <button className="hidden"
              onClick={() =>
                this.setState({ files: [], successfullUploaded: false })
              }
            >
              Done
            </button>
          );
        } else {
          return (
            <button
              disabled={this.state.files.length < 0 || this.state.uploading}
              onClick={this.uploadFiles}
            >
              Upload
            </button>
          );
        }
    }

    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
          promises.push(this.sendRequest(file));
        });
        try {
          await Promise.all(promises);
          this.setState({ successfullUploaded: true, uploading: false });
          // alert('requests finished');
        } catch (e) {
          // Not Production ready! Do some error handling here instead...
          this.setState({ successfullUploaded: true, uploading: false });
        }
    }

    sendRequest(file) {
      const options = {
        url: 'http://localhost:5000/driveAPI/addFile',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          file_label: file.name,
         current_folder_id: this.props.currentFolderId
        }
      };
      
      axios(options)
        .then(response => {
           //do something here
        }); 
    }

    componentWillMount() {

    }

    render() {
        return (
          <div className="Upload">
            <span className="Title">Upload Files</span>
            <div className="Content">
              <div>
                <Dropzone
                  onFilesAdded={this.onFilesAdded}
                  disabled={this.state.uploading || this.state.successfullUploaded}
                />
              </div>
              <div className="Files">
                {this.state.files.map(file => {
                  return (
                    <div key={file.name} className="Row">
                      <span className="Filename">{file.name}
                      {
                      this.state.successfullUploaded ? <CloudDoneIcon className="upload-item-done-icon"></CloudDoneIcon> : null
                      }
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="Actions">{this.renderActions()}</div>
          </div>
        );
      }
}

export default UploadContainer;