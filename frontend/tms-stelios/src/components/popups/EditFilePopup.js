import React from 'react';
import { Button} from 'react-bootstrap';
import axios from "axios";

class EditFilePopup extends React.Component {


    constructor(props){
        super(props);
        this.state = { 
            isFileBeingEdited: false,
            canThisFileBeEdited: true,
            file_latest_version: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleFileEditing = this.toggleFileEditing.bind(this);
    }


    toggleFileEditing(fileid){
        if(this.state.isFileBeingEdited){

            this.setState({
                isFileBeingEdited: false
            });
            //edit finished
            const options = {
                url: 'http://localhost:5000/driveAPI/updateFileEditingStatus',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    file_id: fileid,
                    action: "check-out"
                }
              };
              
              axios(options)
                .then(response => {

                }); 

        }else{
            //edit started
            const options = {
                url: 'http://localhost:5000/driveAPI/getFileEditingStatus',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    file_id: fileid
                }
              };
              
              axios(options)
                .then(response => {
                    var res = JSON.parse(response.request.response);
                    if(res.status == "live"){
                        this.setState({
                            canThisFileBeEdited: false,
                            isFileBeingEdited: false                    
                        });
                    }else if(res.status == "!live"){
                        this.setState({
                            canThisFileBeEdited: true,
                            isFileBeingEdited: true
                        });
                        
                        const options2 = {
                            url: 'http://localhost:5000/driveAPI/updateFileEditingStatus',
                            method: 'POST',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json;charset=UTF-8'
                            },
                            data: {
                                file_id: fileid,
                                action: "check-in"
                            }
                        }
                        axios(options2).then(response => {});
                    }
                }); 

            
        }
    }



    handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      //for debugging!
      // for (var [key, value] of formData.entries()) { 
      //   console.log(key, value);
      //  };

      //converting formData object to json string
      var object = {};
      formData.append("version_key", this.state.file_latest_version);
      formData.append("file_name", this.props.fileName);
      formData.append("original_ver_file_id", this.props.file_id);
      formData.append("file_folder_id", this.props.currentFolderId);

      formData.forEach((value, key) => {object[key] = value});
      var json = JSON.stringify(object);

      //converting json string to obj to get it done - i need the current folder id
      var testObj = JSON.parse(json);
      var current_folder_id = testObj.current_folder_id;

    const options = {
        url: 'http://localhost:5000/driveAPI/addNewVersion',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            description: testObj.description,
            version_key: testObj.version_key,
            file_name: testObj.file_name,
            original_ver_file_id: testObj.original_ver_file_id,
            file_folder_id: testObj.file_folder_id
        }
    }
    axios(options).then(response => {
        this.props.reRenderFolders(this.props.currentFolderId);
        this.props.closePopup();
    });
    }

    componentDidMount() {
        const options = {
            url: 'http://localhost:5000/driveAPI/getVersionsCount',
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
                console.log(response.request.response);
                var res_obj = JSON.parse(response.request.response);
                var versionsFound = parseInt(res_obj.versionCounter);
                var newVer = versionsFound + 1;
                this.setState({
                file_latest_version: newVer
            })
            }); 
     }


  render() {
      console.log(this.state.file_latest_version)

    return (
      <div className='popup'>
        <div className='popup_inner_file_edit'>

    <h3 className="add-new-item-title">Edit file</h3>
        <form onSubmit={this.handleSubmit}>
        <span className="align-text-left">
        <p>Click <b>edit</b> to create a new <b>version</b> of {this.props.fileName}: </p>
        </span>
        {/* <UploadContainer currentFolderId={this.props.currentFolderId}></UploadContainer> */}
        <input className="add-new-folder-input" name="description" type="text" placeholder="Enter some description about the new version"></input>
        {
            this.state.canThisFileBeEdited ?
            null
            :
            <p className="file_unavailable">This file is currently being edited by another user. Please try again later...</p>
        }
        {
            this.state.isFileBeingEdited ? 
            <Button className="check-out-editing-button" onClick={ () => this.toggleFileEditing(this.props.file_id)}>Stop editing (Check out)</Button>
            :
            <Button className="check-in-editing-button" onClick={ () => this.toggleFileEditing(this.props.file_id) }>Start editing (Check in)</Button>
        }
        <div className="popup-buttons-columns">
        <Button className="popup-buttons" onClick={this.props.closePopup}>Cancel</Button>
        </div>
        <div className="popup-buttons-columns">
        <Button type="submit" className="popup-buttons popup-right-button">Submit new version</Button>
        </div>
        </form>
        </div>
      </div>
    );
  }
}


export default EditFilePopup;