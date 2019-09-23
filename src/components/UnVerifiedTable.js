import React from "react";
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { Fab, InputLabel, Icon, FormControlLabel, FormLabel, Radio, TextField, RadioGroup, Checkbox, Select, CardActions, FormControl, CircularProgress, Input, MenuItem, Dialog, Button, DialogContent, Card, CardContent, CardHeader, CardActionArea, CardMedia, makeStyles, useTheme } from '@material-ui/core';
import '../style/table.css';
import { load_partner, LoadingPartnerInfo, loadedImage, VerifyingPartner, LoadingUnverifiedPartner, dropDownClose, dropDownOpen, dialogClose, dialogOpen } from '../redux/action_creators/Partner_info_Load.js';
import ImageMounting from './ImageMounting.js';
import { reject } from "q";

const mapStateToProps = (state) => {
  return {
    data: state,
    fetching: state.fetching,
    verified: state.verified,
    unverified: state.unverified,
    dialog_state: state.dialog_state,
    imgUrl: state.imgUrl

  }
}

const imgUrl = '';
function TransactionStatus(props) {
  if (props.data.id) {
    return (
      <Fab
        size="small"
        color="secondary"
        variant="extended"
        aria-label="delete"
        className="Paid_button">
        <Icon   >done</Icon>
        Paid
      </Fab>);
  }
  else {
    return (
      <Fab
        size="small"
        variant="extended"
        aria-label="delete"
        className="Paid_button">
        <Icon   >done</Icon>
        Due
    </Fab>
    );
  }
}

function StatusColumn(props) {

  if (props.data.is_active == "true") {
    return (<div className="active"></div>);
  }
  else {
    return (<div className="not_active"></div>);
  }
}

//////// Creation of dummy data for the table ////////////
let columns = [
  { title: "Partner ID", field: "org_id" },
  { title: "Created", field: "created" },
  { title: "Company", field: "is_active", render: rowData => <div>{rowData.org_name} , {rowData.is_active == "true" ? <h3 style={{ color: "red" }}>OFF</h3> : <h3 style={{ color: "green" }}>ON</h3>}</div>, lookup: { true: "Off", false: "On" } },
  { title: "", field: "org_name", render: rowData => null, filtering: false },
  { title: "Mobile", field: "usr_orgs[0].m_number" },
  { title: "City", field: "addresses[0].city" },
  { title: "Loaclity", field: "addresses[0].locality" },
  { title: "Email", field: "usr_orgs[0].email" },
  { title: "Pin", field: "addresses[0].pincode" },
  { title: "GSTIN", field: "gstin" }

];

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 1000
  },
  card: {
    display: 'flex',
    height: 500,
    width: "100%"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: "100%",
    height: 500,
    margin: 20,
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'space-evenly'

  },
  cover: {
    width: 600,
    height: 400
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  form: {
    width: 100,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  rejected: {
    display: 'flex',
    flexDirection: "column"
  },
  info_input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
}));

function SimpleDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(10);
  const [value, setValue] = React.useState('Retail');
  const [date, setDate] = React.useState('');


  const [inputField, setInput] = React.useState({

    dl: '',
    expiry: '',
    dlType: ''
  });

  const [approved, setApproved] = React.useState({
    dl: false,
    gst: false
  });


  const [rejected, setRejected] = React.useState({
    dl_not_valid: false,
    dl_not_match: false,
    gst_no_valid: false,
    dl_expires: false
  });


  const onSelectDate = (event) => {
    console.log("DATE ", date);
    setDate(event.target.value)
    setInput({ ...inputField, ["expiry"]: event.target.value })
  }

  function handleRadioChange(event) {
    setValue(event.target.value);
    setInput({ ...inputField, ["dlType"]: value })
  }



  const handelOnChange = (type) => (event) => {
    console.log(event.target.value)
    setInput({ ...inputField, [type]: event.target.value });
  }

  const classes = useStyles();
  const theme = useTheme();

  const handleChangeEvent = (event) => {
    console.log("Change Event");
    setStatus(event.target.value);

  }

  const onApprove = () => {
    console.log("Approve", props.data, date, value, inputField.dl);
    props.dispatch(VerifyingPartner(props.data.org_id, inputField.dl, value, date));
    Close();
  }
  const Close = () => {
    console.log("CLOSEING");
    props.dispatch(dialogClose());
    setOpen(false);
    setStatus(10);
    setValue("retailer");
    setDate('');
    setInput({ ...inputField, ["dl"]: '' });
    setApproved({ ...approved, ["gst"]: false })

  }
  const handelRejected = (type) => (event) => {
    setRejected({ ...rejected, [type]: event.target.checked });
  }
  const handleApproved = (type) => (event) => {
    setApproved({ ...approved, [type]: event.target.checked })
  }

  const handleClose = () => {
    setOpen(false)

  }
  const handleOpen = () => {
    setOpen(true)
  }

  console.log("ROW DATA", status);
  return (
    <Dialog open={props.open} onClose={Close}>
      <DialogContent >
        <Card className={classes.card}>
          <CardHeader />
          <CardMedia
            className={classes.cover}
          >
            <h1>{props.data != null ? ("" + props.data.org_name) : null}</h1>
            <div>{props.data != null ? ("" + props.data.usr_orgs[0].f_name) : null}</div>
            <ImageMounting imageIdentifier={"1dced081-aa2a-427b-b527-63abb29ad9b3"} />
          </CardMedia>

          <div className={classes.details}>

            <CardContent className={classes.content}>
              <div className={classes.info}>
                <div>

                  <div>
                    <h1>{props.data != null ? ("" + props.data.org_type).toUpperCase() : null}</h1>
                    <h3>{props.data != null ? ("" + props.data.drug_licenses[0].valid_till) : null}</h3>
                  </div>
                  <FormControl className={classes.form}>

                    <InputLabel htmlFor="demo-controlled-open-select">Select status</InputLabel>
                    <Select className={classes.form}
                      open={open}
                      value={status}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      input={<Input value={status} placeholder="Select status" name="status" id="age-label-placeholder" />}
                      onChange={handleChangeEvent}
                      name="age">
                      <MenuItem default value={10}>Approve</MenuItem>
                      <MenuItem value={20}>Reject</MenuItem>
                    </Select>
                  </FormControl>

                  <div>
                    {
                      status == 10 ?
                        <div className="approve" className={classes.rejected}>
                          <FormControlLabel
                            control={<Checkbox checked={approved.dl} value="dl" />}
                            label="Valid DL"
                            onChange={handleApproved('dl')}
                          />

                          <FormControlLabel
                            control={<Checkbox checked={approved.gst} value="gst" />}
                            label="GST DETAILS MATCH"
                            onChange={handleApproved('gst')}
                          />
                        </div> :
                        <div className="rejected" className={classes.rejected}>
                          <FormControlLabel
                            control={<Checkbox checked={rejected.dl_not_valid} value="dl_not_valid" />}
                            label="DL not valid"
                            onChange={handelRejected('dl_not_valid')}
                          />

                          <FormControlLabel
                            control={<Checkbox checked={rejected.dl_not_match} value="dl_not_match" />}
                            label="GST details not match"
                            onChange={handelRejected('dl_not_match')}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={rejected.gst_no_valid} value="gst_no_valid" />}
                            label="GST not valid"
                            onChange={handelRejected('gst_no_valid')}
                          />

                          <FormControlLabel
                            control={<Checkbox checked={rejected.dl_expires} value="dl_expires" />}
                            label="DL expires"
                            onChange={handelRejected('dl_expires')}
                          />
                        </div>
                    }
                  </div>

                </div>
                <div className="horizontal_divider"></div>
                <div className={classes.info_input}>
                  <Input value={inputField.dl} onChange={handelOnChange('dl')} name="dl" placeholder="Enter DL" />
                  <TextField
                    id="date"
                    label="Expiry Date"
                    type="date"
                    value={date}
                    onChange={onSelectDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">DL Type</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      className={classes.group}
                      value={value}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel value="Retail" control={<Radio />} label="Retail" />
                      <FormControlLabel value="Wholesale" control={<Radio />} label="Wholesale" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <CardActions>
                <Button onClick={onApprove} disabled={((status == 10) && (!approved.dl || !approved.gst) || (inputField.dl == '' || date == '' || value == ''))} color="primary" >Approve</Button>

                <Button colo="secondary">Rejected</Button>
              </CardActions>
              <CardActions>
              </CardActions>
            </CardContent>
            <div className={classes.controls}>

            </div>
          </div>

        </Card>
      </DialogContent>
    </Dialog>
  );
}
class UnVerifiedTable extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    props.dispatch(LoadingUnverifiedPartner("OK"));
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setRowData = this.setRowData.bind(this);
    this.state = {
      rowData: null
    }
    console.log("unVerified Resut", props.unverified);
  }

  setRowData = (data) => {
    this.setState({
      rowData: data
    })
  }

  onClose = () => {
    this.props.dispatch(dialogClose());
  }

  onOpen = () => {
    this.props.dispatch(dialogOpen());
  }

  render() {

    if (this.props.unverified.length == 0) {
      return (<CircularProgress color="secondary" />)
    }
    else if (this.props.unverified.length) {
      return (
        <div>
          <SimpleDialog data={this.state.rowData}  dialog_status={this.props} dispatch={this.props.dispatch} open={this.props.dialog_state} onClose={this.onClose} />
          <MaterialTable
            title="Partner Management"
            columns={columns}
            data={this.props.unverified}
            options={{ filtering: true }}
            actions={[{
              icon: () => <Button color="primary">Verify</Button>,
              onClick: (event, rowData) => {
                this.onOpen();
                console.log(rowData);
                this.setRowData(rowData);
              }

            }]}

            options={{
              actionsColumnIndex: -1
            }}
          >

          </MaterialTable>
        </div>
      );
    }
    else {
      return (
        <h1>Error</h1>
      );
    }
  }
}

export default connect(mapStateToProps)(UnVerifiedTable);
