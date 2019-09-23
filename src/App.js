import React from 'react';
import logo from './logo.svg';
import './App.css';
import DashboardLayout from './components/Dashboard';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

    data: state
  };
}


function App() {
  return (
    <div className="App">
      <DashboardLayout />
    </div>
  );
}

export default (connect(mapStateToProps)(App));
