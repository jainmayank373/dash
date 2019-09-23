import React, { } from "react";
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import Select from 'react-dropdown-select'
import {
    ButtonGroup,
    Typography,
    Box,
    Button,
    Dialog,
    DialogContent,
    AppBar,
    withStyles,
    CircularProgress,
    Paper,
    InputLabel,
    InputBase,
    FormControl,
    Snackbar,
    IconButton,
    Menu,
    MenuItem,
    DialogActions,
    Tooltip,
    SnackbarContent
} from '@material-ui/core';

import { CloudUpload, CloseSharp } from "@material-ui/icons";
import '../style/table.css';
import { MTableToolbar } from 'material-table';
import {
    load_partner,
    LoadingPartnerInfo,
    loadingUnHarmonized,
    onDecline,
    onAddingMedicine,
    populatingForm,
    unPopulatingForm,
    onUploading,
    fetchingUsers,
    deleteUser,
    edit_user,
    addUser,
    editUser
} from '../redux/action_creators/Partner_info_Load.js';

import AutosuggestInput from "./AutosuggestInput";

import Autosuggest from 'react-autosuggest';
import { fetchingSuggestion } from '../redux/action_creators/Partner_info_Load.js';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}


const languages = [
    {
        id: 1,
        name: "BANDAGE"

    },
    {
        id: 2,
        name: "CAP"


    },
    {
        id: 3,
        name: "CREAM"


    }, {
        id: 4,
        name: "DEVICE"


    }, {
        id: 5,
        name: "DISKETTES"


    }, {
        id: 6,
        name: "DROPS"


    }, {
        id: 7,
        name: "EXPECTORANT"


    }, {
        id: 8,
        name: "FACE WASH"

    }, {
        id: 9,
        name: "FOAM"

    },
    {
        id: 10,
        name: "GEL"


    }, {
        id: 11,
        name: "GRANULES"


    }, {
        id: 12,
        name: "GUM"


    }, {
        id: 13,
        name: "GUMMIES"


    }, {
        id: 14,
        name: "INFUSION"


    },
    {
        id: 15,
        name: "INHALER"

    },
    {
        id: 16,
        name: "INJ"


    }, {
        id: 17,
        name: "JELLY"


    }, {
        id: 18,
        name: "KIT"


    }, {
        id: 19,
        name: "LINIMENT"


    }, {
        id: 20,
        name: "LIQUID"


    }, {
        id: 21,
        name: "LOTION"


    }, {
        id: 22,
        name: "LOZENGE"


    }, {
        id: 23,
        name: "OIL"


    }, {
        id: 24,
        name: "OINT"


    }, {
        id: 25,
        name: "PAINT"


    }, {
        id: 26,
        name: "PARTICLES"


    }, {
        id: 27,
        name: "PASTE"


    }, {
        id: 28,
        name: "PASTILLES"


    }, {
        id: 29,
        name: "PATCH"


    }, {
        id: 30,
        name: "PESSARY"


    }, {
        id: 31,
        name: "PLASTER"


    }, {
        id: 32,
        name: "POWDER"


    }, {
        id: 33,
        name: "RESPULES"


    }, {
        id: 34,
        name: "ROLL-ON"


    }, {
        id: 35,
        name: "ROTACAPS"


    }, {
        id: 36,
        name: "SACHET"


    }, {
        id: 37,
        name: "SHAMPOO"


    }, {
        id: 38,
        name: "SOAP"


    }, {
        id: 39,
        name: "SOFTULES"


    }, {
        id: 40,
        name: "SOLUTION"


    }, {
        id: 41,
        name: "SPRAY"


    }, {
        id: 42,
        name: "STRIP"


    }, {
        id: 43,
        name: "SUPPOSITORY"


    }, {
        id: 44,
        name: "SUSP"


    }, {
        id: 45,
        name: "SYP"


    },
    {
        id: 46,
        name: "TAB"


    },
    {
        id: 47,
        name: "TINCTURE"


    }, {
        id: 48,
        name: "TRANSCAPS"


    }, {
        id: 49,
        name: "TRANSPULES"


    }, {
        id: 50,
        name: "VACCINE"


    }, {
        id: 51,
        name: "WIPES"


    }

];
const mapStateToProps = (state) => {
    return {
        data: state,
        fetching: state.fetching,
        unharmonized: state.unharmonized,
        populatedForm: state.populatedForm,
        suggestions: state.suggestions,
        users: state.users

    }
}

const renderSuggestion = suggestion => (
    <Paper className="suggestion_container">
        {suggestion.composition}
    </Paper>
);
function DateFormat(props) {

    const date = new Date(props.date);
    const newDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    console.log("NewDATE", newDate);
    return (
        <span>{newDate}</span>
    );


}

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {

        borderRadius: "2px",
        position: 'relative',
        backgroundColor: "#fbfbfb",
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '506px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

function Status(props) {
    return (<BootstrapInput />);
}

//////// Creation of dummy data for the table ////////////

class AccountManagement extends React.Component {


    constructor(props) {
        super(props);
        props.dispatch(fetchingUsers());

        this.onRowClick = this.onRowClick.bind(this);
        this.state = {
            unhar_med_id: '',
            brand_name: '',
            composition: '',
            hsn_code: '',
            selectedUser: null,
            medicine_form: [{
                name: ''
            }],
            newValue: '',
            value: '',
            primary_pack: null,
            tabs: 0,
            EMAIL:'',
            MOBILE:'',
            TEAM:'',
            anchorEl: null,
            UnHarmonised: this.props.unharmonized,
            confirmDialogState: false
            ,
                email: '',
                m_number: '',
                f_name: '',
                team: '',
                selectedUserId:null
            ,
            isDelete: true,
            isEdit:false
        }

        this.onRowClick = this.onRowClick.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.openConfirmation = this.openConfirmation.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCancelEdit =  this.onCancelEdit.bind(this);

        //   console.log(props);
    }

    onUploadFile(event) {
        var formData = new FormData();
        formData.append("imgUploader", event.target.files[0]);
        var filedsObject = { brand_name: 1, hsn_code: 2, Manufacturer: 7 }

        console.log(event.target.files);
        formData.append('matchfrom', 2);
        formData.append("colnumber", 2);
        formData.append("end", 8);
        formData.append("name", JSON.stringify([{ name: "Mayank" }, { name: "jain" }]));

        this.props.dispatch(onUploading(formData));
    }

    onChange1 = (event, { newValue }) => {
        //   console.log("LOGINING");
        this.setState({
            composition: newValue
        });
    }
    componentWillReceiveProps = () => {
    }

    onChange = (event, { newValue }) => {
        //    console.log("PRINTIN VALUES", newValue, event.target.value);
        this.setState({
            value: newValue
        });

    }


    getSuggestionValue1 = suggestion => {/* console.log("printing suggestion value", suggestion)*/; return suggestion.composition };

    getSuggestions1 = value => {
        //   console.log("GETING SUGGESTION", value)
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 && this.props.suggestions ? [] : this.props.suggestions.filter(lang =>
            lang.composition.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => {/* console.log("printing suggestion value", suggestion)*/; return suggestion.composition };

    getSuggestions = value => {
        //  console.log("GETING SUGGESTION", value)
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 && this.props.suggestions ? [] : this.props.suggestions.filter(lang =>
            lang.composition.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    onSuggestionsFetchedRequest = ({ value }) => {

        console.log(value);
        console.log(this.state.suggestions);
        if (value.length == 4) {

            if (this.props.type == "manufacturer") {
                //      console.log("Manufacturer");
            }
            else if (this.props.type == "composition") {
                //       console.log("Composition");
            }
            this.props.dispatch(fetchingSuggestion(value));

            this.setState({
                suggestions: this.props.suggestions
            })
        }

        /*if(value.length == 2){

        }*/
    }

    onCancelEdit(){
        this.setState({
            isEdit:false,
            selectedUser:null
        })
    }

    onSuggestionsClearRequest = () => {
        this.setState({
            suggestions: []
        })
    }

    onInputChange = (type) => (event) => {

        var value = event.target.value;

        this.setState({...this.state,[type]:event.target.value})

   /*     this.setState((prevState) => {
            var newState = {
                field_type: ''
            }
            prevStatetype] = value
            return prevState;
        })*/

    }

    onRowClick = (data) => {
        console.log("The Data we get", data);
        var arr = [{
            name: data.med_form
        }]
        this.setState({ value: data.manufacturer, unhar_med_id: data.unhar_med_id })
        this.setState({ medicine_form: arr })
        this.setState({ brand_name: data.brand_name });
        this.setState({ primary_pack: data.primary_pack })

        // this.props.dispatch(populatingForm(data));
    }
    columns = [
        { title: "Name", field: "f_name" },
        { title: "Company email", field: "email" },
        { title: "Phone No.", field: "m_number" },
        { title: "Permission", field:'' },
        {
            title: null, field: '', cellStyle: {
                width: "1px"
            }, render: rowData => <div>
                <Menu
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}>

                    <MenuItem onClick={() => { this.handleClose(rowData) }}><Button onClick={() => { this.openConfirmation( true,false) }}>Edit</Button></MenuItem>
                    <MenuItem onClick={() => { this.handleClose(rowData) }}><Button onClick={() => { this.openConfirmation(false,true) }}>Delete</Button></MenuItem>
                </Menu>
            </div>
        }

    ];

    openConfirmation(isEdit,isDelete) {
    
        this.setState({
            confirmDialogState: true,
            isDelete: isDelete,
            isEdit:isEdit
            

        })
    }


    onConfirm() {

        if (this.state.isDelete) {

            console.log("deleteing", this.state.selectedUser);
            this.props.dispatch(deleteUser(this.state.selectedUser.user_id));
            this.setState({
                selectedUser: null,
                confirmDialogState: false
            });
        }
        else {
            this.setState({
                selectedUser:null,
                confirmDialogState: false,
                email:this.state.selectedUser.email,
                m_number:this.state.selectedUser.m_number,
                f_name:this.state.selectedUser.f_name,
                selectedUserId:this.state.selectedUser.user_id
            })

        }
    }

    onCancel() {
        this.setState({
            confirmDialogState: false,
            selectedUser: null,
            isDelete:false,
            isEdit:false

        })
    }

    onDecline(rowData) {
        // console.log("decline request");
        // console.log("ROWDAT DECLINE", rowData);
        this.props.dispatch(onDecline(rowData.unhar_med_id));


    }

    selectChange = (value) => {
        if (value.length != 0) {
            console.log(value[0]);
            this.setState({
                medicine_form: value
            })
        }
        else {
            console.log(value)
        }

    }

    onBrandChange = (event) => {
        console.log(event.target.value);
        this.setState({
            brand_name: event.target.value
        })
    }

    onAddUser = (value) => {
        console.log(value, this.state);
        if(this.state.isEdit){
            this.props.dispatch(editUser(this.state.selectedUserId,this.state.f_name,this.state.m_number));
        }   
        else if(this.state.isEdit === false){
            this.props.dispatch(addUser(this.state));
 
        }
    }

    handleClick(event, rowData) {

       console.log("Handeling click", rowData);
        this.setState({
            anchorEl: event.currentTarget,
            selectedUser: rowData
        })
    }

    handleClose(data) {
        console.log(data);
        this.setState({
            anchorEl: null
        })
    }


    render() {


        if (!this.props.unharmonized) {
            return (<CircularProgress color="secondary" />)
        }
        else if (this.props.unharmonized) {
            var { value } = this.state;
            var { composition } = this.state;
            const inputProps = {
                className: "suugestion_input",
                value: value,
                onChange: this.onChange
            };
            const inputProps2 = {
                className: "suugestion_input",
                value: composition,
                onChange: this.onChange1
            };
            return (
                <div style={{ paddingTop: "60px" }}>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={this.props.data.isDeleted}
                            autoHideDuration={6000}
                            >
                            <SnackbarContent
                              message="User deleted!"
                            />
                         </Snackbar>                
                         <Dialog
                            open={this.state.confirmDialogState}
                              >
                            <DialogContent>
                                {this.state.isDelete === true ? "Do you want to delete this user" : "Want to Edit this user info?"}
                            </DialogContent>
                            <DialogActions >
                                <Button onClick={this.onConfirm} >Yes</Button>
                                <Button onClick={this.onCancel}>Cancel</Button>
                            </DialogActions>
                        </Dialog>

                        <div className="display_row">
                            <MaterialTable
                                style={{ width: "50%" }}
                                title="Accounts"
                                columns={this.columns}
                                data={this.props.users}
                                options={{
                                    search: false
                                }}

                                actions={[{
                                    icon: 'more_horiz',
                                    onClick: (event, rowData) => this.handleClick(event, rowData)

                                }]}

                                components={{
                                    Toolbar: props => (
                                        <div>
                                            <MTableToolbar {...props} />

                                        </div>
                                    ),
                                }}

                                options={{
                                    actionsColumnIndex: -1
                                }}
                            >
                            </MaterialTable>


                            <Paper
                                className="display_column"
                                style={{ width: "45%" }}
                            >
                                { this.state.isEdit === false?  <h1>Add Account</h1>:<h1>Edit Account</h1> } 
                                <FormControl>
                                    <InputLabel shrink htmlFor="bootstrap-input6">
                                        COMPANY EMAIL ID
                                 </InputLabel>
                                 <BootstrapInput value={this.state.email} onChange={this.state.isEdit === false?this.onInputChange('email'):this.onInputChange('') } />
                                   
                                </FormControl>
                                <FormControl>
                                    <InputLabel shrink htmlFor="bootstrap-input5">
                                        MOBILE NUMBER
                           </InputLabel>
                                    <BootstrapInput value={this.state.m_number} onChange={this.onInputChange('m_number')} id="bootstrap-input5" />
                                </FormControl>
                                <FormControl>
                                    <InputLabel shrink htmlFor="bootstrap-input4">
                                        NAME
                           </InputLabel>
                                    <BootstrapInput value={this.state.f_name} onChange={this.onInputChange('f_name')} id="bootstrap-input4" />
                                </FormControl>
                                <FormControl>
                                    <InputLabel shrink htmlFor="bootstrap-input3">
                                        TEAM
                           </InputLabel>
                                    <BootstrapInput value={this.state.team} onChange={this.onInputChange('team')} id="bootstrap-input3" />
                                </FormControl>
                                <div style={{ paddingTop: "20px" }}>
                                    <Button 
                                        disabled={this.state.email === "" || this.stateemail === "" || this.stateteam === ""} 
                                        onClick={this.onAddUser} variant="contained" color="primary">  
                                        { this.state.isEdit === false? "Add User":"Edit User" } 
                                    </Button>
                                    {this.state.isEdit === true? <Button onClick={this.onCancelEdit}>Cancel</Button>:null}
                                </div>
                            </Paper>
                        </div>
                </div>

                    );
                }
        else {

                        console.log("Verified User", this.props.unharmonized)
            return (
                <h1>Error</h1>
                    );
                }
            }
        }
        
        export default connect(mapStateToProps)(AccountManagement);
        
        /*
        
                        <FormControl>
                        <InputLabel shrink htmlFor="bootstrap-input">
                            SALT COMPOSITION
                            </InputLabel>
                        <AutosuggestInput type={"composition"} rowValue="JAIN" />
                    </FormControl>*/