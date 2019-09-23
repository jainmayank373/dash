import load_partner from '../action_creators/Partner_info_Load.js'
import ACTIONS from '../Rdux_Const.js'
const intiState = {
    name: "MAyank jain",
    verified: [],
    unverified: [],
    fetching: true,
    dialog_state: false,
    dropdown_state: false,
    update_partner: "",
    harmonized: [],
    unharmonized: [],
    imgUrl: '',
    populatedForm: null,
    suggestions: [],
    users: [],
    isDeleted: false,
    userEditInfo: null,
    isUserAdd: false,
    matchedData:[],
    isBulkUpload:false
}


function AppReducers(state = intiState, action) {

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
        case ACTIONS.DIALOG_CLOSE:
            return Object.assign({}, state, {
                dialog_state: false
            })
        case ACTIONS.DIALOG_OPEN:
            return Object.assign({}, state, {
                dialog_state: true
            })
        case ACTIONS.DROPDOWN_CLOSE:
            return Object.assign({}, state, {
                dropdown_state: false
            })
        case ACTIONS.DROPDOWN_CLOSE:
            return Object.assign({}, state, {
                dropdown_state: true
            })
        case ACTIONS.VERIFIED_PARTNER:
            console.log("VERIFYING PARTNER", action.payload.data.update_org);
            return Object.assign({}, state, {
                update_partner: action.payload.data.update_org
            })
        case ACTIONS.VERIFYING_PARTNER:
            console.log("VERIFIYING", action);
            return state;
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
        case ACTIONS.LOADED_UNHARMONIZED:
            console.log("Loaded unharmonized");
            return Object.assign({}, state, {
                unharmonized: action.payload.data.unharmonized_medicines
            });
        case ACTIONS.DECLINE_REQUEST:
            console.log("Decline Request", action.payload);
            return state;

        case ACTIONS.LOADED_IMAGE:
            console.log("Image loaded");
            return Object.assign({}, state, {
                imgUrl: action.payload.url
            });
        case ACTIONS.POPULATING_FORM:
            console.log("POPULATING FORM");
            return Object.assign({}, state, {
                populatedForm: action.payload
            })
        case ACTIONS.FETCHING_SUGGESTION:
            console.log("FETCHING Suggestion", action.payload);
            return Object.assign({}, state, {
                suggestions: action.payload.data.med_master_list
            })
        case ACTIONS.UNPOPULATING_FORM:
            console.log("Unpopulating form");
            return Object.assign({}, state, {
                populatedForm: action.payload
            })
        case ACTIONS.ADDING_MEDICINES:
            console.log("Adding medicines");
            return state;
        case ACTIONS.UPLOADING_FILES:
            return Object.assign({}, state, {
                matchedData: action.payload,
                isBulkUpload:true
            })
        case ACTIONS.CLOSE_FULL_SCREEB_DIALOG:
            return Object.assign({},state,{
                isBulkUpload:false
            })
        case ACTIONS.FETCHING_USERS:
            return Object.assign({}, state, {
                users: action.payload
            })
        case ACTIONS.DELETE_USER:
            return Object.assign({}, state, {
                isDeleted: true
            })
        case ACTIONS.USER_DELETED_DONE:
            return Object.assign({}, state, {
                isDeleted: false
            })
        case ACTIONS.EDIT_USER:
            return Object.assign({}, state, {
                userEditInfo: action.payload
            })
        case ACTIONS.ADD_USER:
            return Object.assign({}, state, {
                isUserAdd: true
            })
        case ACTIONS.USER_ADDED:
            return Object.assign({}, state, {
                isUserAdd: false
            })
        case ACTIONS.UPLOAD_DONE:
            return Object.assign({}, state, {
                matchedData: action.payload.data
            })
        default:
            console.log("un handle actions", state);
            return state;
    }



}


export default AppReducers;