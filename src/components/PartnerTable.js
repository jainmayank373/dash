import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import {connect}  from 'react-redux';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


import { Table } from '@material-ui/core';
import VerifiedTable from './VerifiedTable';
import UnVerifiedTable from './UnVerifiedTable';

const mapStateToProps = (state) =>{

  return {
    data: state,
    fetching:state.fetching,
    verified:state.verified
    
  }
}

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Verified" />
        <Tab label="Unverified" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <VerifiedTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        < UnVerifiedTable/>
      </TabPanel>

    </Paper>
  );
}

export default connect(mapStateToProps)(CenteredTabs);