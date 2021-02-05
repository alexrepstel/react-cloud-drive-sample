import React from 'react';
import ReactHtmlParser from 'react-html-parser'; 
import Message from './message';
import socketIOClient from "socket.io-client";


class MessengerMessageCanvas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };

      }






    render(){
        const messages = this.props.messages.map(
            item => 
            <Message
            message={item.text}
            currentUser={this.props.currentUser}
            messageSender={item.user}
            >
            </Message>
        );


        return(
            <div> 
                <div className="messenger-message-canvas">
                    <div className="messages-container">
                    {messages}
                    </div>

                    <div class="messenger-message-canvas-footer compose">
                    <input 
                    onChange={ (e) => this.props.setChatMessage(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' ? this.props.submitChatMessage(e) : null}
                    class="message-reply" 
                    type="text" 
                    placeholder="Type a message" 
                    value={this.props.messageValue}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default MessengerMessageCanvas;