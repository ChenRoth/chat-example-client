import React from 'react';
import { IMessage } from '../../models/message';
import { IState } from '../../redux/reducer';
import { connect } from 'react-redux';

interface IMessagesProps {
    messages: IMessage[];
    whosTyping?: string;
}

class _Messages extends React.Component<IMessagesProps> {
    render() {
        const { whosTyping, messages } = this.props;
        
        return (
            <div>
                {whosTyping ? `${whosTyping} is typing...` : null}
                {messages.length ? messages.map((message) => (
                    <p key={message.timestamp}>{new Date(message.timestamp).toISOString()} [{message.sender}] {message.text}</p>
                )) : 'There are no messages yet...'}
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    messages: state.messages,
    whosTyping: state.activeUsers[0],
});

export const Messages = connect(mapStateToProps)(_Messages);