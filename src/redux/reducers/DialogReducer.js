import load_partner from '../action_creators/Partner_info_Load.js'
import ACTIONS from '../Rdux_Const.js'
import { Dialog } from '@material-ui/core';

const intiState = {
    fetching: true,
    dialog_state: false,
    dropdown_state: false,
    
}



function DialogReducers(state = intiState, action) {

    switch (action.type) {

        case ACTIONS.DIALOG_CLOSE:
            return Object.assign({}, state, {
                dialog_state: false
            })
        case ACTIONS.DIALOG_OPEN:
            return Object.assign({}, state, {
                dialog_state: true
            })
        default:
            console.log("un handle actions", state);
            return state;
    }



}


export default DialogReducers;