import React from 'react';
import personImg from '../img/person.png';
import girlImg from '../img/girl.png';
import womanImg from '../img/woman.png';
import jackImg from '../img/jack.png';
import steliosImg from '../img/boy.png';

class ConversationBubble extends React.Component{

    constructor(props){
        super(props);

    }
  
    render(){

        
        return(
            <div>
                    <li>
                        <div className="avatar">
                            <div className="avatar-image">
                                <img src={personImg} width="60"/>
                            </div>
                        </div>
                        {this.props.pname}
                    </li>
            </div>

        );
    }
}

export default ConversationBubble;