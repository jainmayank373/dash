import load_partner from '../action_creators/Partner_info_Load.js'
import ACTIONS from '../Rdux_Const.js'

const intiState = {

    harmonized: [],
    unharmonized: [],
    suggestions: [],
    populatedForm: ''
}

function DrugsManagmentReducers(state = intiState, action) {
    switch (action.type) {

        case ACTIONS.LOADING_HARMONIZED:
            console.log("Loading harmoinzed");
            return state;
        case ACTIONS.LOADED_HARMONIZED:
            console.log("Loading unharmonized");
            return Object.assign({}, state, {
                harmonized: action.payload.data.med_master_list
            })
        case ACTIONS.LOADING_UNHARMONIZED:
            console.log("Loading un harm");
            return state;
        case ACTIONS.FETCHING_SUGGESTION:
            console.log("FETCHING REQUEST");
            return Object.assign({}, state, {
                suggestions: action.payload.data.med_master_list
            })
        case ACTIONS.LOADED_UNHARMONIZED:
            console.log("Loaded unharmonized");
            return Object.assign({}, state, {
                unharmonized: action.payload.data.unharmonized_medicines
            });
        case ACTIONS.POPULATING_FORM:
            console.log("POPULATING FORM");
            return Object.assign({}, state, {
                populatedForm: action.payload
            })
        default:
            console.log("un handle actions in DRUGS MANAGMENT", state);
            return state;
    }
}


export default DrugsManagmentReducers;