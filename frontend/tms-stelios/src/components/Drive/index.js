import React from 'react';
import FolderContainer from './FolderContainer';
import FileExplorerHeader from './FileExplorerHeader.js';
import FileContainer from './FileContainer';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";


class Drive extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fetched_folders: [],
            fetched_files: [],
            apiResponse: "",
            current_folder_id: "0"
        };

        this.reRenderFolders = this.reRenderFolders.bind(this);
        this.runSearch = this.runSearch.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };


    fetchFolders() {
        var request_folder_id = this.state.current_folder_id;
            const options = {
                url: 'http://localhost:5000/driveAPI/getfolders',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                  folderid: request_folder_id
                }
              };
              
              axios(options)
                .then(response => {
                    this.setState({ fetched_folders: JSON.parse(response.request.response) })
                });
    }


    fetchFiles() {
        var request_folder_id = this.state.current_folder_id;
            const options = {
                url: 'http://localhost:5000/driveAPI/getfiles',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                  folderid: request_folder_id
                }
              };
              
              axios(options)
                .then(response => {
                    this.setState({ fetched_files: JSON.parse(response.request.response) })
                });
    }

    async reRenderFolders(new_current_folder_id){
        await this.setState({ 
           current_folder_id: new_current_folder_id 
        });
        //calling the function to re-fetch folders based on current folder id
        this.fetchFolders();
        this.fetchFiles();
    }


    navigateBack(current_folder_id){
        var previous_folder_id = "";
            const options = {
                url: 'http://localhost:5000/driveAPI/getFolderParent',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                  folderid: current_folder_id
                }
              };
              
              axios(options)
                .then(response => {
                var object = JSON.parse(response.request.response);
                previous_folder_id = object[0].parent_folder_id;
                this.reRenderFolders(previous_folder_id);
                });     
    }

    runSearch(term){
        if(term != ""){
            var all_files = this.state.fetched_files;
            var searched_files = all_files.filter(function(i){
                return i.file_name.toLowerCase().match(term);
            });
            this.setState({
                fetched_files: searched_files
            })
        }else{
            this.fetchFiles();
        }
    }

    componentWillMount() {
        this.fetchFolders();
        this.fetchFiles();
    }

render() {
    
    //reRenderFolders function is passed onto FolderContainer component along with folder id
    const folders = this.state.fetched_folders.map(item => 
    <FolderContainer 
    selector={item._id.toString()} 
    reRenderFolders={this.reRenderFolders} 
    folder_id={item._id.toString()} 
    label={item.label}
    folder_name = {item.folder_name}
    currentFolderId={this.state.current_folder_id}>
    </FolderContainer> );
    
    const files = this.state.fetched_files.map(item => 
    <FileContainer 
    selector={item._id.toString()} 
    reRenderFolders={this.reRenderFolders} 
    file_id={item._id.toString()} 
    type={item.file_type} 
    label={item.file_name} 
    createdTS={item.created_ts}
    modifiedTS={item.last_modified_ts}
    currentFolderId={this.state.current_folder_id}>
    </FileContainer> );

    return(
        <div>

        <FileExplorerHeader 
        runSearch={this.runSearch}
        navigateBack={this.navigateBack} 
        currentFolderId={this.state.current_folder_id} 
        reRenderFolders={this.reRenderFolders}/>
        {folders}
        {files}
        <button
              onClick={this.onLogoutClick}
              className="logout-positioning"
            >
              Logout
            </button>


        </div>
    );
}

}

Drive.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Drive);