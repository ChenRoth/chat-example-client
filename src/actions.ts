import { Dispatch } from "redux";
import { ActionType, IAction } from "./redux/reducer";

export function connectAction() {
    return (dispatch: Dispatch<IAction>) => {
        const ws = new WebSocket('ws://localhost:4000');
        ws.addEventListener('open', () => {
            dispatch({
                type: ActionType.Connect,
                payload: {
                    ws,
                }
            });
        });

        ws.addEventListener('message', ({data}) => {
            const action = JSON.parse(data);
            dispatch(action);
        });
    }
}

export function sendMessageAction(msg: any) {
    return (dispatch: Dispatch<IAction>, getState: any) => {
        const {ws} = getState();
        ws.send(JSON.stringify(msg));
    }
} 