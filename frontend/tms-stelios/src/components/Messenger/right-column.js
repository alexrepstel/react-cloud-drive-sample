import React from 'react';
import myImg from '../img/boy.png';
import LinkIcon from '@material-ui/icons/Link';

class MessengerRightColumn extends React.Component{

constructor(props){
    super(props);
    this.state = {
        selected_chatroom: ""
    }
}


    render(){
        return(
            <div className="messenger-right-column">
                <div className="col-content">
                    <div className="user-panel">
                        <div className="avatar">
                        <div className="avatar-image">
                            <img src={myImg} />
                        </div>
                        <p>{this.props.currentUser}</p>
                        <p>{this.props.currentUserEmail}</p>
                        <p>TMS Digital</p>
                        </div>
                    </div>
                    <div className="right-column-shared-media-content">
                    <p>Team's chatrooms</p>

                        <div className="chatroom-join-buttons">
                        {
                            this.props.currentChatRoom === 'creative' 
                            ?
                            <button onClick={ (e) => this.props.setRoom("creative")} className="chatroom-selected">Creative Team</button>
                            :
                            <button onClick={ (e) => this.props.setRoom("creative")} className="join-chat-button">Creative Team</button>

                        }
                        {
                            this.props.currentChatRoom === 'marketing'
                            ?
                            <button onClick={ (e) => this.props.setRoom("marketing")} className="chatroom-selected">Marketing Team</button>
                            :
                            <button onClick={ (e) => this.props.setRoom("marketing")} className="join-chat-button">Marketing Team</button>

                        }
                        {
                            this.props.currentChatRoom === 'sales'
                            ?
                            <button onClick={ (e) => this.props.setRoom("sales")} className="chatroom-selected">Sales Team</button>
                            :
                            <button onClick={ (e) => this.props.setRoom("sales")} className="join-chat-button">Sales Team</button>
                        }
                        {
                            this.props.currentChatRoom === 'support'
                            ?
                            <button onClick={ (e) => this.props.setRoom("support")} className="chatroom-selected">Support Team</button>
                            :
                            <button onClick={ (e) => this.props.setRoom("support")} className="join-chat-button">Support Team</button>
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessengerRightColumn;