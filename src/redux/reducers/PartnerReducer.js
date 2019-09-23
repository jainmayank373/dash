import load_partner from '../action_creators/Partner_info_Load.js'
import ACTIONS from '../Rdux_Const.js'
import { Dialog } from '@material-ui/core';

const intiState = {
    name: "MAyank jain",
    verified: [],
    unverified: [],
    suggestions: []
}


function PartnerReducers(state = intiState, action) {

    switch (action.type) {

        case ACTIONS.LOADING_PARTNER:
            console.log(action);
            return Object.assign({}, state, {
                fetching: true
            });
        case ACTIONS.LOAD_PARTNER:
            return Object.assign({}, state, {
                verified: action.payload.data.org
            });

        case ACTIONS.LOADING_UNVERIFIED_PARTNER:
            return Object.assign({}, state, {
                unverified: action.payload.data.org
            })

        case ACTIONS.VERIFIED_PARTNER:
            console.log("VERIFYING PARTNER", action.payload.data.update_org);
            return Object.assign({}, state, {
                update_partner: action.payload.data.update_org
            })
        case ACTIONS.VERIFYING_PARTNER:
            console.log("VERIFIYING", action);
            return state;
        default:
            console.log("un handle actions", state);
            return state;
    }

}


export default PartnerReducers;