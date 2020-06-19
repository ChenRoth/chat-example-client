import React from 'react';
import { connect } from 'react-redux';
import { connectAction, sendMessageAction } from '../../actions';
import { MsgInput } from '../MsgInput/MsgInput';
import { SignIn } from '../SignIn/SignIn';
import { Messages } from '../Messages/Messages';
import { IState } from '../../redux/reducer';

interface IChatProps {
    connect(): void;
    isSignedIn: boolean;
}

class _Chat extends React.Component<IChatProps> {
    componentDidMount() {
        const { connect } = this.props;
        connect();
    }

    render() {
        const { isSignedIn } = this.props;
        return (
            <div>
                {isSignedIn ?
                    <>
                        <Messages />
                        <MsgInput />
                    </>
                    :
                    <SignIn />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    isSignedIn: state.isSignedIn,
})

const mapDispatchToProps = {
    connect: connectAction,
    sendMessage: sendMessageAction,
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat);

