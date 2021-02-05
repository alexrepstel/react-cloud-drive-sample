import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HelpIcon from '@material-ui/icons/Help';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import {withRouter} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { Button} from 'react-bootstrap';
import NewFolderPopup from '../popups/NewFolderPopup.js';
import NewFilePopup from '../popups/NewFilePopup.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NewFileUploadPopup from '../popups/FileUploadPopup';

class FileExplorerHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            showFolderPopup: false,
            showFilePopup: false,
            showUploadFilePopup: false,
            current_folder_id: "",
            search_value: ""
        };

        this.setSearchValue = this.setSearchValue.bind(this);
    }


    toggleNewFolderPopup() {
        this.setState({
          showFolderPopup: !this.state.showFolderPopup
        });
    }

    toggleNewFilePopup() {
        this.setState({
            showFilePopup: !this.state.showFilePopup
        });
    }
    

    toggleNewFileUploadPopup() {
        this.setState({
            showUploadFilePopup: !this.state.showUploadFilePopup
        });
    }

     setSearchValue(e){
         this.setState({
            search_value: e
        })
    }


    componentWillMount() {
    }

  render() {
        // alert(this.props.currentFolderId);
      


    return (
      <nav className="navbar navbar-light drive-header-bar">
        <div className="drive-header-bar-container">
        <div className="row full-width">
            <div onClick={ () => {this.props.navigateBack(this.props.currentFolderId)}} className="col-md-0 col-md-offset-1 drive-header-bar-whole">
                <span className="drive-header-bar-icon-adj">
                <ArrowBackIcon></ArrowBackIcon>
                </span>
                <span className="drive-header-bar-tabs">
                Back
                </span>
            </div>
            <div onClick={this.toggleNewFilePopup.bind(this)} className="col-md-0 col-md-offset-1 drive-header-bar-whole">
                <span className="drive-header-bar-icon-adj">
                <AddIcon></AddIcon>
                </span>
                <span className="drive-header-bar-tabs">
                File
                </span>
            </div>
            <div onClick={this.toggleNewFolderPopup.bind(this)} className="col-md-0 drive-header-bar-whole">
                <span className="drive-header-bar-icon-adj">
                <AddIcon></AddIcon>
                </span>
                <span className="drive-header-bar-tabs">
                Folder
                </span>
            </div>
            <div onClick={this.toggleNewFileUploadPopup.bind(this)} className="col-md-0 drive-header-bar-whole">
                <span className="drive-header-bar-icon-adj">
                <PublishIcon></PublishIcon>
                </span>
                <span className="drive-header-bar-tabs">
                Upload
                </span>
            </div>
            
            <div className="col-md-0 drive-header-bar-whole search-bar-files">
               <input 
                onChange={ (e) => this.setSearchValue(e.target.value)} 
               className="files-search" 
               type="text" 
               placeholder="Search for files..."></input>
            </div>
            <div className="col-md-0 drive-header-bar-whole">
               <Button onClick={ (e) => {this.props.runSearch(this.state.search_value)}}>Search</Button>
            </div>

            
            {this.state.showFolderPopup ?
            <NewFolderPopup
            currentFolderId={this.props.currentFolderId}
            closePopup={this.toggleNewFolderPopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            />
            : null
            }
            {this.state.showFilePopup ?
            <NewFilePopup
            closePopup={this.toggleNewFilePopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            />
            : null
            }
            {this.state.showUploadFilePopup ?
            <NewFileUploadPopup
            closePopup={this.toggleNewFileUploadPopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            />
            : null
            }
        </div>
        
          
        </div>
      </nav>
    );
  }
}

export default FileExplorerHeader;
