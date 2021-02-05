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

import RenameFolderPopup from '../popups/RenameFolderPopup';
import axios from "axios";

class FolderContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            item_id: "",
            showRenameFolderPopup: false
        };
        this.deleteHandler = this.deleteHandler.bind(this);   
    }
    
    deleteHandler(e, data){
        var item_type = "folder";

        const options = {
            url: 'http://localhost:5000/driveAPI/deleteItem',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                delete_file_id: data.this_folder_id,
                item_type: item_type
            }
          };
          
          axios(options)
            .then(response => {
                this.props.reRenderFolders(this.props.currentFolderId)
            }); 
    }


    toggleRenameFolderPopup() {
        this.setState({
            showRenameFolderPopup: !this.state.showRenameFolderPopup
        })
    };

    render(){
        
            var icon = folder_icon;
        


        //allocating dynamic id to folder elements so we can control them
        var clickableRightClick = 'clickable-area_' + this.props.folder_id;

        return(
            <div className="item_container">
            <ContextMenuTrigger id={clickableRightClick}>
            <div className="item_box">  
            {/* double click calls the reRenderFolders function from index passing props folder id as param */}
            <img src={icon} width="100" onDoubleClick={()=>this.props.reRenderFolders(this.props.folder_id)} />
            </div>
            </ContextMenuTrigger>
            <p> {this.props.folder_name}</p>
            <ContextMenu id={clickableRightClick} className="contextMenu-cl">
            <MenuItem  className="contextMenu-item" data={{this_folder_id: this.props.folder_id}} onClick={this.deleteHandler}>
            <img className="contextMenu-icon" src={TrashIcon} width="20" />Delete
            </MenuItem>
            <MenuItem  className="contextMenu-item" data={{this_folder_id: this.props.folder_id}} onClick={ this.toggleRenameFolderPopup.bind(this) }>
            <img className="contextMenu-icon" src={RenameIcon} width="20" />Rename
            </MenuItem>
            <MenuItem divider />
            </ContextMenu>
            {this.state.showRenameFolderPopup ?
            <RenameFolderPopup
            folderName = {this.props.folder_name}
            item_id = {this.props.folder_id}
            closePopup={this.toggleRenameFolderPopup.bind(this)}
            reRenderFolders={this.props.reRenderFolders}
            currentFolderId={this.props.currentFolderId}
            />
            : null
            }
            </div>
        );
    }
}

export default FolderContainer;