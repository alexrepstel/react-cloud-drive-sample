import React from 'react';
import { Button} from 'react-bootstrap';
import axios from "axios";


class NewFilePopup extends React.Component {


    constructor(props){
        super(props);
        this.state = { 
          item_type: "folder" 
      };
      this.handleSubmit = this.handleSubmit.bind(this);
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
      formData.forEach((value, key) => {object[key] = value});
      var json = JSON.stringify(object);

      //converting json string to obj to get it done - i need the current folder id
      var testObj = JSON.parse(json);
      var current_folder_id = testObj.current_folder_id;
            
      const options = {
        url: 'http://localhost:5000/driveAPI/addFile',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          file_label: testObj.file_label,
          current_folder_id: current_folder_id
        }
      };
      
      axios(options)
        .then(response => {
          this.props.reRenderFolders(current_folder_id);
          this.props.closePopup();
        }); 
    }



  render() {

    var itemType = "";
    itemType = this.state.item_type;
    var current_folder_id = this.props.currentFolderId;

    return (
      <div className='popup'>
        <div className='popup_inner'>

    <h3 className="add-new-item-title">Add a new file</h3>
        <form onSubmit={this.handleSubmit}>
        <p>File name:</p>
        <input className="add-new-folder-input" name="file_label" type="text" placeholder="Input file's name"></input>
        <input name="current_folder_id" value={current_folder_id} hidden></input>
        <div class="popup-buttons-columns">
        <Button className="popup-buttons" onClick={this.props.closePopup}>Cancel</Button>
        </div>
        <div class="popup-buttons-columns">
        <Button type="submit" className="popup-buttons popup-right-button">Add new file</Button>
        </div>
        </form>
        </div>
      </div>
    );
  }
}


export default NewFilePopup;