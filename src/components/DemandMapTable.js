import React from "react";
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { Fab, Icon, Button , CircularProgress} from '@material-ui/core';
import '../style/table.css';
import { load_partner, LoadingPartnerInfo } from '../redux/action_creators/Partner_info_Load.js';

const mapStateToProps = (state) => {
  return {
    data: state,
    fetching:state.fetching,
    verified:state.verified,
    unverified:state.unverified
    
  }
}
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
  { title: "GST", field: "gst" ,type:"Date",render:rowData =><div>{"GSTNUMBER" } <Button color="secondary">Approve</Button></div> },
  { title: "Created", field: "created" ,type:"Date"},
];


class DemandMapTable extends React.Component {

  constructor(props) {
    super(props);
    props.dispatch(LoadingPartnerInfo("OK"));
    
    
    console.log("org Resut",props.verified);
    
  }


  render() {
  
    if(this.props.verified.length == 0){
    return(  <CircularProgress  color="secondary" />)
    }
    else if(this.props.verified.length){
    return (

      <MaterialTable
        title="Partner Management"
        columns={columns}
        data={this.props.verified}
        options={{
          filtering: true
        }}
      >

      </MaterialTable>
    );
  }
  else{
    return (
      <h1>Error</h1>
    );
  }
}
}

export default connect(mapStateToProps)(DemandMapTable);
