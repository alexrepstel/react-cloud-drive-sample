import React from 'react';
import UsersList from './UsersList';

import jwt_decode from "jwt-decode";

class AdminSettings extends React.Component{

    constructor(props){
        super(props)
        this.state ={}


    }

    async updateAdminState(value){
        await this.setState({ 
           isAdmin: value 
        });
    }


    componentDidMount(){
        //getting current user info
        var token = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(token);
        const isAdmin = decoded.isAdmin;
        if(isAdmin){
            this.updateAdminState(true);
        }else{
            this.updateAdminState(false);
        }
    }



render() {

    // const convoBubbles = this.state.users_in_room.map(
    //     item => <ConvoBubble
    //             pname={item.name}
    //             getThisConvo={this.getCurrentConvo}
    //             >
    //             </ConvoBubble>
    // );

    var isAdmin = this.state.isAdmin;
    return(
        <div>
            {
                isAdmin ?
                <UsersList></UsersList>
                :
                <p>Permission denied. You are not an admin.</p>
            }

        </div>
    );
}

}

export default AdminSettings;