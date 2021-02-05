import React from 'react';
import ConvoBubble from './conversation-bubble';
import MessageCanvas from './message-canvas';
import RightColumn from './right-column';
import socketIOClient from "socket.io-client";
import jwt_decode from "jwt-decode";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Messenger extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            chat_username: "",
            chat_room: "",
            messages: [],
            message_value: "",
            users_in_room: [],
            creative_messages: [],
            marketing_messages: [],
            sales_messages: [],
            support_messages: [],
            user_email_address: ""
        };

        this.setChatroom = this.setChatroom.bind(this);
        this.submitChatMessage = this.submitChatMessage.bind(this);
        this.setChatMessage = this.setChatMessage.bind(this);
    }


    async setChatroom(chatroom){

        var previous_chatroom = this.state.chat_room;

        await this.setState({
            chat_room: chatroom
        });


        var joinParams = { name: this.state.chat_username , room: this.state.chat_room, previous_chatroom: previous_chatroom};
        this.socket.emit("join", JSON.stringify(joinParams));


        this.socket.on('roomData', (message) => {
            this.setState({
                users_in_room: message.users
            });
        });
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    componentDidMount(){
        //getting current user info
        var token = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(token);
        var current_user_name = decoded.name;
        var current_user_email = decoded.email;
        console.log(decoded.isAdmin);

        this.setState({
            chat_username: current_user_name,
            user_email_address: current_user_email
        })


        const endpoint = "http://localhost:5000";
        this.socket = socketIOClient(endpoint);
        this.socket.on('message', (message) => {
            if(message.room == 'creative'){
                this.setState({
                    creative_messages: [...this.state.creative_messages, message ]
                })
            }else if(message.room == 'sales'){
                this.setState({
                    sales_messages: [...this.state.sales_messages, message ]
                })
            }else if(message.room == 'marketing'){
                this.setState({
                    marketing_messages: [...this.state.marketing_messages, message ]
                })
            }else if(message.room == 'support'){
                this.setState({
                    support_messages: [...this.state.support_messages, message ]
                })
            }
        });
    }

    async setChatMessage(e){
        await this.setState({
            message_value: e
        })
    }

    submitChatMessage(event){
        event.preventDefault();
        var messageParams = { message: this.state.message_value}
        this.socket.emit("sendMessage", JSON.stringify(messageParams));
        this.setState({ message_value: ""});
    }

render() {

    const convoBubbles = this.state.users_in_room.map(
        item => <ConvoBubble
                pname={item.name}
                getThisConvo={this.getCurrentConvo}
                >
                </ConvoBubble>
    );

    var messagesToSend = [];
    if(this.state.chat_room == 'sales'){
        messagesToSend = this.state.sales_messages;
    }else if(this.state.chat_room == 'marketing'){
        messagesToSend = this.state.marketing_messages;
    }else if(this.state.chat_room == 'creative'){
        messagesToSend = this.state.creative_messages;
    }else if(this.state.chat_room == 'support'){
        messagesToSend = this.state.support_messages;
    }

    return(
        <div>
            <div className="messenger-chats-column">
            <div className="messages">
              <p className="chatroom-members-title">Connected in <b>{this.state.chat_room}</b> chatroom: </p>

            {convoBubbles}
            </div>
            </div>
            <MessageCanvas
                messageValue={this.state.message_value}
                messages={messagesToSend}
                submitChatMessage={this.submitChatMessage}
                setChatMessage={this.setChatMessage}
                currentUser={this.state.chat_username}
            >
            </MessageCanvas>
            <RightColumn
                setRoom={this.setChatroom}
                currentChatRoom={this.state.chat_room}
                currentUser={this.state.chat_username}
                currentUserEmail={this.state.user_email_address}
            >
            </RightColumn>
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

Messenger.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Messenger);