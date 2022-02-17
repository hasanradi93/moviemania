import React, { Component } from 'react';
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types';
import SideBarAdmin from './SideBarAdmin';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
    }



    componentDidMount() {
        console.log("componentDidMount")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
    }



    render() {
        return (
            <div id='contentAdmin' >
                Admin Panel
                <Outlet />
            </div>
        );
    }
}

AdminPanel.propTypes = {

};

export default AdminPanel;