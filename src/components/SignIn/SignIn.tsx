import React, { FormEvent } from 'react';
import { sendMessageAction } from '../../actions';
import { connect } from 'react-redux';

interface ISignInProps {
    sendMessage(msg: any): void;
}

class _SignIn extends React.Component<ISignInProps> {
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input name="name" placeholder="What's your name?" />
                <button type="submit">SIGN IN</button>
            </form>
        );
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const {sendMessage} = this.props;
        const name = (e.target as any).name.value;
        sendMessage({
            type: 'SIGN_IN',
            payload: {
                name,
            }
        })
        
    }
}

const mapDispatchToProps = {
    sendMessage: sendMessageAction,
};

export const SignIn = connect(undefined, mapDispatchToProps)(_SignIn);