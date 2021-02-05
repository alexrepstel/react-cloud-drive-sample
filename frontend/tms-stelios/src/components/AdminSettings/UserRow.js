import React from 'react';
import axios from "axios";



class UserRow extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };


      }


    render(){


        return(
            <div className="users-item"> 
                <div className="user-item-name">
                Name: {this.props.item.name}
                </div>
                <div className="user-item-email">
                Email: {this.props.item.email}
                </div>
                <div className="user-item-actions">
                Type: { this.props.item.isAdmin ? <p>Administrator </p> : <p>User</p>}
                </div>
            </div>
        );
    }

}

export default UserRow;