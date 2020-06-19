import { IMessage } from "../models/message";

export interface IState {
    ws: WebSocket | null;
    isSignedIn: boolean;
    isLoadingValue: boolean;
    messages: IMessage[];
    activeUsers: string[];
}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    Connect = 'CONNECT',  
    ReceiveMsg = 'RECEIVE_MSG',  
    SignedIn = 'SIGNED_IN',
    SomeoneIsTyping = 'SOMEONE_IS_TYPING',
    SomeoneStoppedTyping = 'SOMEONE_STOPPED_TYPING',
}

const getInitialState = (): IState => {
    return {
        activeUsers: [],
        ws: null,
        isLoadingValue: false,
        messages: [],
        isSignedIn: false,
    };
}

export const reducer = (state: IState = getInitialState(), action: IAction): IState => {
    switch (action.type) {
        case ActionType.SomeoneIsTyping: {
            const {name} = action.payload;
            return {
                ...state,
                activeUsers: state.activeUsers.concat(name),
            }
        }

        case ActionType.SomeoneStoppedTyping: {
            const {name} = action.payload;

            const modifiedActiveUsers = state.activeUsers.slice();
            const index = state.activeUsers.indexOf(name);

            if (index > -1) {
                modifiedActiveUsers.splice(index, 1);
            }
            return {
                ...state,
                activeUsers: modifiedActiveUsers,
            }
        }
        case ActionType.SignedIn: {
            return {
                ...state,
                isSignedIn: true,
            }
        }

        case ActionType.Connect: {
            const {ws} = action.payload;
            return {
                ...state,
                ws,
            }
        }

        case ActionType.ReceiveMsg: {
            const msg = action.payload;            
            const modifiedActiveUsers = state.activeUsers.slice();
            const index = state.activeUsers.indexOf(msg.sender);

            if (index > -1) {
                modifiedActiveUsers.splice(index, 1);
            }
            
            return {
                ...state,
                messages: state.messages.concat(msg as IMessage),
                activeUsers: modifiedActiveUsers,
            };
        }

        default: {
            return state;
        }
    }
}