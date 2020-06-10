import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import Pulse from 'react-reveal/Pulse';


class RegisterModal extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillUpdate(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if(nextProps.errors !== this.props.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history); 
    };
    

    render(){
        const { errors } = this.state;
        const alertItems = Object.entries(errors).map(([key, value]) => {
            if(value != null){
              return(
                <div key={key} className="alert alert-danger" role="alert">
                    {value}
                </div>
              )
            }
            return null
        })
        const nameIcon = <FontAwesomeIcon icon={faUser} color="#bfbfbf" />
        const emailIcon = <FontAwesomeIcon icon={faEnvelope} color="#bfbfbf" />
        const passwordIcon = <FontAwesomeIcon icon={faLock} color="#bfbfbf" />
        const password2Icon = <FontAwesomeIcon icon={faClipboardCheck} color="#bfbfbf" />
        return(
            <Pulse>
                <div className="container-fluid register">
                    <h2 className="subHeader">
                        Account usage is mainly for admin updates, however feel free to register an account to check it out!
                    </h2>
                    <h2 className="subHeader">
                        You wont be able to see much though...
                    </h2>
                    <div className="formView">
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <h4>
                                    <b>Register</b> 
                                </h4>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-md-auto">
                                <p className="grey-text text-darken-1">
                                    Already have an account? <Link to="/login" className="links">Log in</Link>
                                </p>
                            </div>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                {errors.name || errors.email || errors.password || errors.password2 || errors.main ? 
                                    <div>
                                        {alertItems}
                                    </div>
                                :
                                    ""
                                }
                                <div className="row">
                                    <div className="col formField" >
                                
                                        <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        />
                                        <label htmlFor="name" className="labelIcon">{nameIcon}</label>
                                        {this.state.name === "" ? 
                                            <div className="selectedInput">Name</div>
                                        :
                                            <div className="hasInput">Name</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-group">
                                <div className="row">
                                    <div className="col formField">
                                        <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="text"
                                        className="form-control"
                                        />
                                        <label htmlFor="email" className="labelIcon">{emailIcon}</label>
                                        {this.state.email === "" ? 
                                            <div className="selectedInput">Email</div>
                                        :
                                            <div className="hasInput">Email</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col formField">
                                        <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        />
                                        <label htmlFor="password" className="labelIcon">{passwordIcon}</label>
                                        {this.state.password === "" ? 
                                            <div className="selectedInput">Password</div>
                                        :
                                            <div className="hasInput">Password</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col formField">
                                        <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                        className="form-control"
                                        />
                                        <label htmlFor="password2" className="labelIcon">{password2Icon}</label>
                                        {this.state.password2 === "" ? 
                                            <div className="selectedInput">Confirm Password</div>
                                        :
                                            <div className="hasInput">Confirm Password</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col">
                                    <button className="btn-block btn-primary" type="submit">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Pulse>

            
        )
    }
}

RegisterModal.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterModal));