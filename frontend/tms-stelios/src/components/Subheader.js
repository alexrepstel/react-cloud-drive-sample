import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HelpIcon from '@material-ui/icons/Help';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import {withRouter} from 'react-router-dom';



class Subheader extends React.Component {

    // constructor(props){
    //     super(props);
    //     console.log(this.props);
    //     console.log(this.props.pathname);
    // }

  render() {
      console.log(this.props);
    return (
      <nav className="navbar navbar-light sub-navbar">
        <div className="container">
        <div className="row full-width">
            <div className="col-md-2 col-md-offset-1 sub-navbar-whole">
                <span className="sub-navbar-icon-adj">
                <CreateIcon></CreateIcon>
                </span>
                <span className="sub-navbar-tabs">
                Creative Team
                </span>
            </div>
            <div className="col-md-2 sub-navbar-whole">
                <span className="sub-navbar-icon-adj">
                <AttachMoneyIcon></AttachMoneyIcon>
                </span>
                <span className="sub-navbar-tabs">
                Sales Team
                </span>
            </div>
            <div className="col-md-2 sub-navbar-whole">
                <span className="sub-navbar-icon-adj">
                <RecordVoiceOverIcon></RecordVoiceOverIcon>
                </span>
                <span className="sub-navbar-tabs">
                Marketing Team
                </span>
            </div>
            <div className="col-md-2 sub-navbar-whole">
                <span className="sub-navbar-icon-adj">
                <HelpIcon></HelpIcon>
                </span>
                <span className="sub-navbar-tabs">
                Support Team
                </span>
            </div>


            <div className="col-md-2 sub-navbar-whole" >
                <SettingsApplicationsIcon></SettingsApplicationsIcon>
                <span className="sub-navbar-tabs">
                Settings
                </span>
            </div>
        </div>
        
          
        </div>
      </nav>
    );
  }
}

export default Subheader;
