import React from "react";
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { Fab, Icon, Button ,CircularProgress} from '@material-ui/core';
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
var dummyData = Array(10).fill(0);
let columns = [
  { title: "", field: "is_active", render: rowData => <StatusColumn data={rowData} /> ,filtering: false},
  { title: "Partner ID", field: "org_id" },
  { title: "Created", field: "created" ,type:"Date"},
  { title: "Company", field: "is_active" , render: rowData => <div>{rowData.org_name } , { rowData.is_active=="true" ? <h3 style={{color:"red"}}>OFF</h3>:<h3 style={{color:"green"}}>ON</h3>}</div>,lookup:{true:"On",false:"Off"} },
  { title: "", field: "org_name",render:rowData => null,filtering:false  },  
  { title: "Mobile", field: "usr_orgs[0].m_number" },
  { title: "Loaclity", field: "addresses[0].locality" },
  { title: "Pin", field: "addresses[0].pincode" },
  { title: "Amount", field: "", render: rowData => <TransactionStatus data={rowData} /> },  
  { title: "Bounce", field: "bounce" }, 
  {title:"CSAT",field:"csat"}

];
dummyData = dummyData.map((_, index) => {
  return {
    id: index,
    partnerId: 'Cipla',
    contact: '+91 9743245667',
    createdOn: "02-12-2018",
    fulfilled: 5,
    assigned: 10,
    medsMapped: 300,
    locality: "Rakkar, Dharamashala"
  }
})


class VerifiedTable extends React.Component {

  constructor(props) {
    super(props);
    props.dispatch(LoadingPartnerInfo("OK"));
    
    
    console.log("org Resut",props.verified);
    
  }


  render() {
  
    if(this.props.verified.length == 0){
    return(<CircularProgress  color="secondary" />)
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

export default connect(mapStateToProps)(VerifiedTable);
