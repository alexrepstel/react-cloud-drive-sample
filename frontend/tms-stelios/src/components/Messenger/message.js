import React from 'react';

class Message extends React.Component{

    render(){

        var myMessage = false;
        if(this.props.currentUser == this.props.messageSender){
            myMessage = true;
        }
        return(
            <div> 
            <div className="dialog-message-container">
                {
                    myMessage ? 
                    <div className="dialog-message-text my">
                        {this.props.message}
                    </div>
                    :
                    <div className="dialog-message-text notmy">
                        {this.props.message}
                    </div> 
                }
            </div>
                {
                    myMessage ? 
                    <p className="message-sender-my">{this.props.messageSender}</p>
                    :
                    <p className="message-sender-notmy">{this.props.messageSender}</p>
                }

                    
            </div>
        );
    }

}

export default Message;