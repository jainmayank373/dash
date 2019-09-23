import load_partner from '../action_creators/Partner_info_Load.js'
import ACTIONS from '../Rdux_Const.js'
import { Dialog } from '@material-ui/core';

const intiState = {
    name: "MAyank jain",
    fetching: true,
    dialog_state: false,
    dropdown_state: false,
    update_partner: ""
}

function DropdownReducers(state = intiState, action) {
    switch (action.type) {

        case ACTIONS.DROPDOWN_CLOSE:
            return Object.assign({}, state, {
                dropdown_state: false
            })
        case ACTIONS.DROPDOWN_CLOSE:
            return Object.assign({}, state, {
                dropdown_state: true
            })
        default:
            console.log("un handle actions", state);
            return state;
    }
}


export default DropdownReducers;