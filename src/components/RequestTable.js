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
    IconButton
} from '@material-ui/core';

import { CloudUpload,CloseSharp } from "@material-ui/icons";
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
    close_dialog
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
        suggestions: state.suggestions

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

class RequestTable extends React.Component {


    constructor(props) {
        super(props);
        props.dispatch(loadingUnHarmonized());

        this.onRowClick = this.onRowClick.bind(this);
        this.onSelectingNew = this.onSelectingNew.bind(this);
        this.onSelectingResolved = this.onSelectingResolved.bind(this);
        this.state = {
            unhar_med_id: '',
            brand_name: '',
            composition: '',
            hsn_code: '',
            medicine_form: [{
                name: ''
            }],
            newValue: '',
            value: '',
            primary_pack: null,
            tabs: 0,
            UnHarmonised: this.props.unharmonized,
            buttonClass1: "",

            buttonClass2: ""
        }
        this.onRowClick = this.onRowClick.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        //   console.log(props);
    }

    onUploadFile(event) {

        var formData = new FormData();
        formData.append("imgUploader", event.target.files[0]);
        var filedsObject = { brand_name: 3, hsn_code: 7, manufacturer: 2,composition:4 ,med_form:1};

        console.log("FILEDS OBJECT", filedsObject);
        formData.append('imgUploader', this.state.file);
        formData.append('matchfrom', "2");
        formData.append("colnumber", "2");
        formData.append("end", "20");
        formData.append("expiry_format", "14")
        formData.append("expiry_col", "14");
        formData.append("expiry_date_fromate", "14");
        formData.append("col_data", JSON.stringify([filedsObject]))


        this.props.dispatch(onUploading(formData));
    }

    onChange1 = (event, { newValue }) => {
        //   console.log("LOGINING");
        this.setState({
            composition: newValue
        });
    }
    
    componentWillReceiveProps = () => {
        this.onSelectingNew();
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

    onSuggestionsClearRequest = () => {
        this.setState({
            suggestions: []
        })
    }

    onInputChange = (type) => (event) => {
        // console.log("prenting value", type, event.target.value);
        this.setState({ ...this.state, [type]: event.target.value })
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
        { title: "Partner", field: "inventories[0].org.org_name" },
        { title: "Submited on", field: "created", render: rowData => <DateFormat date={rowData.created} /> },
        { title: "Medicine form", field: "med_form" },
        { title: "Manufacturer", field: "manufacturer" },
        { title: "Brand name", field: "brand_name" },
        { title: "Primary pack", field: "primary_pack" },
        { title: "Action", field: "is_declined", render: rowData => <div>{rowData.is_declined == false ? <Button onClick={() => { this.onDecline(rowData) }} style={{ backgroundColor: "rgba(249, 33, 33, 0.28)", color: "#ff5e5e" }}>Decline</Button> : <div>Rejected</div>}</div> },
    ];

    full_screen_columns = [
        {title:"Brand Name" , field:"brand_name"},
        {title:"Manufacturer" , field:"manufacturer"},
        {title:"Composition" , field:"composition"},
        {title:"Medicine Form" , field:"med_form"},
        {title:"Match" , field:"newMatch"}
    ]

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
    onAddMedicines = (value) => {

        console.log(value, this.state);
        this.props.dispatch(onAddingMedicine(this.state));
    }

    onSelectingNew() {
        //this.data.unharmonized.filter()
        var filterData = this.props.unharmonized.filter((data) => {
            return data.is_declined == false
        })
        this.setState({
            UnHarmonised: filterData,
            buttonClass1: "btn1",
            buttonClass2: ""
        })
    }

    onSelectingResolved() {
        //this.data.unharmonized.filter()
        var filterData = this.props.unharmonized.filter((data) => {
            return data.is_declined == true
        })
        this.setState({
            UnHarmonised: filterData,
            buttonClass1: "",
            buttonClass2: "btn1"

        })
    }


    render() {
        console.log("THIS STATE", this.state);
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
            console.log("Verified User", this.props.unharmonized)
            return (
                <div style={{ paddingTop: "60px" }}>
                    <div style={{ float: "right", width: "25%" }}>
                        <input
                            style={{ display: "none" }}
                            id="text-button-file"
                            multiple
                            type="file"
                            onChange={this.onUploadFile}
                        />
                        <label htmlFor="text-button-file">
                            <Button  style={{ backgroundColor: "white", margin: "10px" }} component="span" >
                                <CloudUpload /> Upload
                             </Button>
                        </label>
                        <a href="#">Download sample file</a>
                    </div>
                    <Dialog fullScreen open={this.props.data.isBulkUpload}>
                        <AppBar>
                            <IconButton onClick={() => {
                                this.props.dispatch(close_dialog());
                                this.setState({
                                    drawer_state: false,
                                    dialog_state: false,

                                })
                            }}>
                                <CloseSharp /></IconButton>
                            <Button onClick={this.fetchingNext} >NEXT</Button>
                        </AppBar>
                        <MaterialTable
                            title="Purchase"
                            columns={this.full_screen_columns}
                            data={this.props.data.matchedData}
                            onRowClick={(rowData, i) => { this.setState({ Clicked_row_data: i, suggestions: i.match, popup_state: true }) }}
                            editable={{
                                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {


                                    for (var fileds in newData) {
                                        if (typeof (newData[fileds]) == "string" && newData[fileds].match(/^[0-9]+$/) != null) {
                                            newData.Pack = parseInt(newData.Pack);
                                        }

                                        this.props.data.matchedData[oldData.tableData.id][fileds] = newData[fileds];
                                    }


                                    resolve()

                                })
                            }}
                            options={
                                {
                                    pageSize: this.props.data.matchedData.length,
                                    pageSizeOptions: [50]
                                }

                            }
                        />
                    </Dialog>
                    <div className="display_row">
                        <Dialog fullScreen open={false}>
                            <Snackbar
                                open={false}
                                autoHideDuration={4000}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                onClose={()=>{console.log("hi")}} //Hiding snackbar
                                message={
                                    <span>Uploaded Sucssesfully</span>
                                }

                            />
                            <AppBar>
                                <IconButton onClick={() => {
                                    //Removing matched data
                                }}>
                                    <CloseSharp /></IconButton>
                                <Button onClick={this.fetchingNext} >NEXT</Button>
                            </AppBar>
                            <MaterialTable
                                title="Purchase"
                            columns={[]  /*this.tableRows()*/}
                                data={[]/*matched data*/}
                                onRowClick={(rowData, i) => { console.log("rowData", i); this.setState({ clicked_row_data: i}) }}
                                 editable={{
                                    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {

                                        console.log(newData, oldData)

                                        for (var fileds in newData) {
                                            console.log(fileds)
                                            if (typeof (newData[fileds]) == "string" && newData[fileds].match(/^[0-9]+$/) != null) {
                                                console.log("YS")
                                                newData.Pack = parseInt(newData.Pack);
                                            }

                                          //  this.props.uploadInv.matchedData[oldData.tableData.id][fileds] = newData[fileds];
                                        }


                                        resolve()

                                    }),
                                    onRowDelete: (oldData) => new Promise((resolve, reject) => {
                                        console.log(oldData);


                                        resolve();
                                    })


                                }}

                                options={
                                    {
                                        pageSize: 20,
                                        pageSizeOptions: [50]
                                    }

                                }
                            />
                        </Dialog>
                        <MaterialTable
                            style={{ width: "50%" }}
                            title="Medition addition Request"
                            columns={this.columns}
                            data={this.state.UnHarmonised}
                            onRowClick={(event, rowData) => { this.onRowClick(rowData) }}
                            options={{
                                filtering: true,
                                search: false
                            }}
                            components={{
                                Toolbar: props => (
                                    <div>
                                        <MTableToolbar {...props} />
                                        <div >
                                            <ButtonGroup
                                                variant="contained"
                                                aria-label="full-width contained primary button group"
                                            >
                                                <Button className={this.state.buttonClass1} onClick={this.onSelectingNew}>NEW</Button>
                                                <Button className={this.state.buttonClass2} onClick={this.onSelectingResolved}>Rejected</Button>

                                            </ButtonGroup>
                                        </div>
                                    </div>
                                ),
                            }}
                        >
                        </MaterialTable>


                        <Paper
                            className="display_column"
                            style={{ width: "45%" }}
                        >
                            <h1>Add Medicine</h1>
                            <FormControl >
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    MEDICINE FORM
                           </InputLabel>
                                <Select className="select_input" values={this.state.medicine_form} labelField="name" valueField="name" options={languages} clearable={true} clearOnBlur={true} onChange={(value) => { this.selectChange(value) }} />
                            </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    MANUFACTURER'S NAME
                           </InputLabel>
                                <div>
                                    <Autosuggest
                                        suggestions={this.props.suggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchedRequest}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequest}
                                        getSuggestionValue={this.getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                    />
                                </div> </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    BRAND NAME
                           </InputLabel>
                                <BootstrapInput value={this.state.brand_name} onChange={this.onInputChange('brand_name')} id="bootstrap-input4" />
                            </FormControl>

                            <FormControl>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    SALT COMPOSITION
                           </InputLabel>
                                <Autosuggest
                                    suggestions={this.props.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchedRequest}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequest}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps2}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    HSN CODE
                           </InputLabel>
                                <BootstrapInput value={this.state.hsn_code} onChange={this.onInputChange('hsn_code')} id="bootstrap-input5" />
                            </FormControl>
                            <FormControl>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    PRIMARY PACK VALUE
                           </InputLabel>
                                <BootstrapInput value={this.state.primary_pack} onChange={this.onInputChange('primary_pack')} id="bootstrap-input6" />
                            </FormControl>
                            <div style={{ paddingTop: "20px" }}>
                                <Button disabled={this.state.hsn_code.length < 4 || this.state.hsn_code.length > 8 || this.state.medicine_form == "" || this.state.value == ""} onClick={this.onAddMedicines} variant="contained" color="primary">Add Medicine</Button>
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

export default connect(mapStateToProps)(RequestTable);

/*

                        <FormControl>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                SALT COMPOSITION
                            </InputLabel>
                            <AutosuggestInput type={"composition"} rowValue="JAIN" />
                        </FormControl>*/