import React, { Component } from 'react'
import { Link } from "react-router-dom"
import ContactButtons from './ContactButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {

    constructor() {
        super()
        this.state = {
            mobileMenuState: "",
            search: ""
        }
    }

    componentDidMount(){
        
    }

   

    onMobileClick = () => {
        if(this.state.mobileMenuState === " act") return this.setState({mobileMenuState: ""})
        return this.setState({mobileMenuState: " act"})
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render(){
        const searchIcon = <FontAwesomeIcon icon={faSearch} color="black" />
        const cartIcon = <FontAwesomeIcon icon={faShoppingCart} color="black" />
        return(
            <div className="container-fluid">
                <div className="row header">
                    <div className="col-sm-4 col-md-5 headerLeft">
                        <div className="headerLeftLinks">
                            <Link to="/" className="headerLogoLink">
                                <span className="headerLogo">Fictional</span><span className="headerLogo2">Marketplace</span>
                            </Link>
                            
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2 center-align">
                        <ContactButtons />
                    </div>
                    <div className="col-sm-4 col-md-5 headerRight">
                        <div className="headerRightLinks">
                            <div className="row">
                                <div className="col-10 formField" >
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.search}
                                    id="search"
                                    type="text"
                                    className="form-control"
                                    />
                                    <label htmlFor="email" className="labelIcon">{searchIcon}</label>
                                    {this.state.search === "" ? 
                                        <div className="selectedInput">Search</div>
                                    :
                                        <div className="hasInput">Search</div>
                                    }
                                </div>
                                <div className='col-2 cart'>
                                    <Link to="/" className="headerLogoLink">
                                        {cartIcon}
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="row mobileHeader">
                    <button className={"menuBtn" + this.state.mobileMenuState} onClick={this.onMobileClick.bind(this)}><span className="lines"></span></button>				
                    <nav className={"mainMenu" + this.state.mobileMenuState}>
                        {this.state.loggedIn ? 
                        <ul>
                            <li>
                                <Link to="/">
                                    <button onClick={this.onMobileClick} className="btn btn-header">Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects">
                                    <button onClick={this.onMobileClick} className="btn btn-header">Projects</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <button onClick={this.onMobileClick} className="btn btn-header">About</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        Dashboard
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button onClick={this.onLogoutClick} className="btn btn-header">
                                    Logout
                                </button>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/">
                                    <button onClick={this.onMobileClick} className="btn btn-header">Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects">
                                    <button onClick={this.onMobileClick} className="btn btn-header">Projects</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <button onClick={this.onMobileClick} className="btn btn-header">About</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        <span>Login</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        <span>Register</span>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                                
                        }
                        
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;