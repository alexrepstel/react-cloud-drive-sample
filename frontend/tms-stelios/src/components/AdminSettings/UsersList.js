import React from 'react';
import axios from "axios";
import UserRow from './UserRow';


class UsersList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.fetchUsers = this.fetchUsers.bind(this);

      }

      fetchUsers() {
            const options = {
                url: 'http://localhost:5000/usersPrivate/getUsers',
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {}
              };
              
              axios(options)
                .then(response => {
                    this.setState({ users: JSON.parse(response.request.response) })
                });
    }

    componentWillMount() {
        this.fetchUsers();
    }




    render(){
        const users = this.state.users.map(
            item => 
            <UserRow
                item={item}
            >
            </UserRow>
        );


        return(
            <div> 
                <h3 className="users-list-title">Users list</h3>
                <div className="">
                {users}
                </div>
                
            </div>
        );
    }

}

export default UsersList;