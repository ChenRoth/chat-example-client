import React, { FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { sendMessageAction } from '../../actions';

interface IMsgInputProps {
    sendMessage(msg: any): void;
}

class _MsgInput extends React.Component<IMsgInputProps, any> {
    state = {
        shouldSendMsg: true,
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onType} name="text" placeholder="Enter text..." />
                <button type="submit">SEND</button>
            </form>
        )
    }

    onType = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const { sendMessage } = this.props;
        const { shouldSendMsg } = this.state;
        if (text.length > 0) {
            if (shouldSendMsg) {
                this.setState({
                    shouldSendMsg: false,
                });
                sendMessage({
                    type: 'START_TYPING',
                    payload: {},
                });
            }
        } else {
            this.setState({
                shouldSendMsg: true,
            });

            sendMessage({
                type: 'STOP_TYPING',
                payload: {},
            });
        }
    }

    onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { sendMessage } = this.props;
        const text = (e.target as any).text.value;
        sendMessage({
            type: 'SEND_MSG',
            payload: {
                text,
            }
        });
        (e.target as HTMLFormElement).reset();
    }
}

const mapDispatchToProps = {
    sendMessage: sendMessageAction,
}

export const MsgInput = connect(undefined, mapDispatchToProps)(_MsgInput);

