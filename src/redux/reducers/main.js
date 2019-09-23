import  {combineReducers} from 'redux';
import AppReducers from '../reducers/Reducers.js';
import DialogReducer from './DialogReducer.js';
import DropdownReducers from './DropdownReducers';
import PartnerReduce from './PartnerReducer.js';
import DrugsManagementReducers from './DrugsManagementReducers';
const Reducers =  combineReducers({
    AppReducers,
    DialogReducer,
    DropdownReducers,
    PartnerReduce,
    DrugsManagementReducers
})

export default Reducers;