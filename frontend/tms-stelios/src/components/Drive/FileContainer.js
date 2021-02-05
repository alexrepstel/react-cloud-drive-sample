import React from 'react';
import folder_icon from '../img/folder_icon.png';
import image_file_icon from '../img/image_file_icon.png';
import video_file_icon from '../img/video_file_icon.png';
import pdf_file_icon from '../img/pdf_file_icon.png';
// import ContextMenu from 'react-context-menu';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import EditIcon from '../img/pencil.png';
import NewTabIcon from '../img/new_tab_icon.png';
import TrashIcon from '../img/trash_icon.png';
import ShareIcon from '../img/send_icon.png';
import DuplicateIcon from '../img/duplicate_icon.png';
import DetailsIcon from '../img/question_mark_icon.png';
import RenameIcon from '../img/rename.png';


import FileDetailsPopup from '../popups/FileDetailsPopup';
import RenameFilePopup from '../popups/RenameFilePopup';
import EditFilePopup from '../popups/EditFilePopup';

import axios from "axios";


class FileContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            file_id: "",
            current_folder_id: "",
            showFileDetailsPopup: false,
            showRenameFilePopup: false,
            showEditFilePopup: false
        };
        this.deleteHandler = this.deleteHandler.bind(this);
        
        
    }

    toggleNewFileDetailsPopup() {
        this.setState({
            showFileDetailsPopup: !this.state.showFileDetailsPopup
        })
    };

    toggleRenameFilePopup() {
        this.setState({
            showRenameFilePopup: !this.state.showRenameFilePopup
        })
    };

    toggleFileEditPopup(){
        this.setState({
            showEditFilePopup: !this.state.showEditFilePopup
        })
    };

    deleteHandler(e, data){
        var item_type = "file";

        const options = {
            url: 'http://localhost:5000/driveAPI/deleteItem',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                delete_file_id: data.this_file_id,
                item_type: item_type
            }
          };
          
          axios(options)
            .then(response => {
                this.props.reRenderFolders(this.props.currentFolderId)
            }); 
    }


    

    render(){
        var file_type = this.props.type;
        
        if(file_type == 'folder'){
            var icon = folder_icon;
        }
        else if(file_type == 'image'){
            var icon = image_file_icon;
        }
        else if(file_type == 'video'){
            var icon = video_file_icon;
        }
        else if(file_type == 'pdf'){
            var icon = pdf_file_icon;
        }

        //allocating dynamic id to folder elements so we can control them
        var clickableRightClickFile = 'clickable-area-file_' + this.props.file_id;


        return(
            <div className="item_container">
            <ContextMenuTrigger id={clickableRightClickFile}>
            <div className="item_box">  
            <img src={icon} width="100" />
            </div>
            </ContextMenuTrigger>
            <p> {this.props.label}</p>
            <ContextMenu id={clickableRightClickFile} className="contextMenu-cl">
            <MenuItem className="contextMenu-item" data={{this_file_id: this.props.file_id}} onClick={ this.toggleFileEditPopup.bind(this) }>
            <img className="contextMenu-icon" src={EditIcon} width="20" />Edit
            </MenuItem>
            {/* <MenuItem className="contextMenu-item" data={{this_file_id: this.props.file_id}} onClick={this.handleClick}>
            <img className="contextMenu-icon" src={ShareIcon} width="20" />Share this file
            </MenuItem> */}
            <MenuItem  className="contextMenu-item" data={{this_file_id: this.props.file_id}} onClick={this.deleteHandler}>
            <img className="contextMenu-icon" src={TrashIcon} width="20" />Delete
            </MenuItem>
            <MenuItem  className="contextMenu-item" data={{this_file_id: this.props.file_id}} onClick={ this.toggleRenameFilePopup.bind(this) }>
            <img className="contextMenu-icon" src={RenameIcon} width="20" />Rename
            </MenuItem>
            <MenuItem divider />
            <MenuItem className="contextMenu-item" data={{this_file_id: this.props.file_id}} onClick={ this.toggleNewFileDetailsPopup.bind(this) }>
            <img className="contextMenu-icon" src={DetailsIcon} width="20" />Details
            </MenuItem>
            </ContextMenu>

            {this.state.showFileDetailsPopup ?
            <FileDetailsPopup
            fileName = {this.props.label}
            file_id = {this.props.file_id}
            fileType = {this.props.type}
            closePopup={this.toggleNewFileDetailsPopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            createdTS={this.props.createdTS}
            modifiedTS={this.props.modifiedTS}
            />
            : null
            }
            {this.state.showRenameFilePopup ?
            <RenameFilePopup
            fileName = {this.props.label}
            fileType = {this.props.type}
            file_id = {this.props.file_id}
            closePopup={this.toggleRenameFilePopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            createdTS={this.props.createdTS}
            modifiedTS={this.props.modifiedTS}
            />
            : null
            }
            {this.state.showEditFilePopup ?
            <EditFilePopup
            fileName = {this.props.label}
            fileType = {this.props.type}
            file_id = {this.props.file_id}
            closePopup={this.toggleFileEditPopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            createdTS={this.props.createdTS}
            modifiedTS={this.props.modifiedTS}
            />
            : null
            }

            </div>

        );
    }
}

export default FileContainer;