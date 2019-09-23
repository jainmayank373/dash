import React from 'react';
import {makeStyles} from '@material-ui/core';
import  CenteredTabs  from "./PartnerTable.js";
import  DemandMapTable  from './DemandMapTable.js';
const useStyles = makeStyles(theme => ({
       content: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
}));
function Partner() {
   const classes =  useStyles();
    return (
        <div className={classes.content}>
            <div  />
            <CenteredTabs />
            <div className="demand_map_table">
                <DemandMapTable />
            </div>
        </div>);

}

export default Partner;