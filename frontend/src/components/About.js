import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions"; 
import Roll from 'react-reveal/Roll';

class About extends Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            loggedIn: false,
            errors: {}
        };
    }

    componentDidMount(){
        
    }
    componentDidUpdate(nextProps){
        
    }

    

    render(){
        
        
        return(
            <Roll left>
                <div className="about">
                    <h1 className="mainHeader">
                        About
                    </h1>
                    <h2 className="subHeader">
                        This site is a fully functional and scaleable MERN application (MongoDB, Express, React, and Node.js).
                    </h2>
                    <h2 className="subHeader">
                        Some features include: Global state management with Redux, schema-based modeling for application data via Mongoose, authentication via JWT, passport, and more!
                    </h2>
                    <a href="https://github.com/astgermain/PortfolioSite" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-home">
                        Source Code
                    </button>
                    </a>
                </div>
            </Roll>
        )
    }
}

About.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{ logoutUser })(About);