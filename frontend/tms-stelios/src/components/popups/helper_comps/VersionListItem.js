import React from 'react';
import { Button} from 'react-bootstrap';

class VersionListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
          item_type: "folder" 
      };
    }

  render() {

    var created_date_string = "";
    var createdDate = new Date(this.props.date * 1000);
    created_date_string = createdDate.toGMTString();

    return (
        <div className="file-version-item">
           Version:  <b>v{this.props.version_key}</b>- Created on <b>{created_date_string}</b> - <b> {this.props.desc}</b>
        </div>
    );
  }
}


export default VersionListItem;