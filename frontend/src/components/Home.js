import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { logoutUser } from "../actions/authActions"
import { Link } from "react-router-dom";
import Slide from 'react-reveal/Slide';
import axios from 'axios'
import Rotate from 'react-reveal/Rotate';




//import Zoom from 'react-reveal/Zoom'



class Home extends Component {
    
    constructor() {
        super()
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        
        if(this.props.auth.isAuthenticated) {
            this.setState({loggedIn: true})
        }
    }
    componentDidUpdate(nextProps){
        if(this.props.auth.isAuthenticated !== this.state.loggedIn) {
            this.setState({loggedIn: true})
            //this.props.history.push("/dashboard"); // push user to dashboard when they login
        }

        if(nextProps.errors !== this.props.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    checkUsersName = () => {
        const { user } = this.props.auth;
        try{
            let uName = user.name.split(" ")[0]
            return uName
        }
        catch{
            return ""
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.setState({loggedIn: false});
        if(this.state.mobileMenuState === " act") return this.setState({mobileMenuState: ""})
    }

    lineLoginClick = async () => {
        let res = await axios.get('/line/loginAuth')
        let value = res.data.loginURL
        window.open(`https://access.line.me${value}`, "_self");
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
   
    

    render(){
        const { user } = this.props.auth;
        return(
            <div className="container-fluid topHome">
                <div className="row hero">
                    <div className="herosShadow">
                        <div className="hero-text">
                            A Virtual Marketplace
                        </div>
                        <div className="hero-subtext">
                            Concept E-Commerce App
                        </div>
                    </div>
                </div>
                <div className="row aHero">
                    <Slide top big delay={500}>
                        <div className="col-sm-12 col-md-5 box1">
                            <div className="boxr1-content-inner">
                                {this.state.loggedIn ?
                                <div className="box1-content-inner-items">
                                    <div className="box1-content-header">
                                        Welcome!
                                    </div>
                                    <div className="box1-content-sub">
                                        Get Started Shopping
                                    </div>
                                    <div className="box1-content">
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Browse</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div className="box1-content-inner-items">
                                    <div className="box1-content-header">
                                        Get Started Today!
                                    </div>
                                    <div className="box1-content-sub">
                                        Made easy with LINE
                                    </div>
                                    <div className="box1-content">
                                        <button className="btn line-login-btn" onClick={this.lineLoginClick}>
                                            <img className="line-login-btn-icon" alt=''></img>
                                            <div className="line-login-btn-text">
                                                Log in with LINE
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </Slide>
                    <Slide right big delay={500}>
                    <div className="col-sm-12 col-md-7 box2">
                        <div className="boxr1-content-inner">
                            <div className="box1-content-inner-items">
                                <div className="box1-content-header">
                                    Signed In
                                </div>
                                <div className="box1-content-sub">
                                    Welcome, {user.name ? user.name.split(" ")[0] : 'sign in here'}
                                </div>
                                {this.state.loggedIn ? 
                                    <div className="box1-content">
                                        <Link to="/dashboard">
                                            <button className="btn btn-header">
                                                <span>Dashboard</span>
                                            </button>
                                        </Link>
                                        <button onClick={this.onLogoutClick} className="btn btn-header">
                                            Logout
                                        </button>
                                    </div>
                                :
                                    <div className="box1-content">
                                        <Link to="/register">
                                            <button className="btn btn-header">
                                                <span>Register</span>
                                            </button>
                                        </Link>
                                        <Link to="/login">
                                            <button className="btn btn-header">
                                                <span>Login</span>
                                            </button>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    </Slide>
                </div>
                <div className="row">
                    <Slide left delay={500}>
                        <div className="col-sm-12 col-md-7 box3">
                            <div className="inner-box">
                                <div className="b1">
                                    <div className="box-shadow boxr2-content-inner">
                                        <div className="content-box">
                                            <div className="box1-content-header">
                                                On Sale
                                            </div>
                                            <div className="box1-content-sub">
                                                Shop the best deals anywhere!
                                            </div>
                                            <div className="box1-content">
                                                <Link to="/">
                                                    <button className="btn btn-header">
                                                        <span>Shop Now</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                    <Slide bottom delay={500}>
                        <div className="col-sm-12 col-md-5 box4">
                            <div className="inner-box">
                                <div className="b2">
                                    <div className="box-shadow boxr2-content-inner">
                                        <div className="content-box">
                                            <div className="box1-content-header">
                                                Newly Added
                                            </div>
                                            <div className="box1-content-sub">
                                                See what’s catching people’s attention
                                            </div>
                                            <div className="box1-content">
                                                <Link to="/">
                                                    <button className="btn btn-header">
                                                        <span>Find Deals</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                </div>
                <div className="row">
                        <div className="col-sm-12 col-md-4 boxR3o">
                        <div className="inner-box">
                            <div className="b3">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                    <div className="box1-content-header">
                                        Shoes
                                    </div>
                                    <div className="box1-content-sub">
                                        Over 50+ brands
                                    </div>
                                    <div className="box1-content">
                                    <Link to="/">
                                                    <button className="btn btn-header">
                                                        <span>Shop Now</span>
                                                    </button>
                                                </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
           
                    <div className="col-sm-12 col-md-4 boxR3o">
                    <div className="inner-box">
                        <div className="b4">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                <div className="box1-content-header">
                                    Electronics
                                </div>
                                <div className="box1-content-sub">
                                    Best tech accessories
                                </div>
                                    <div className='box1-content'>
                                    <Link to="/">
                                                    <button className="btn btn-header">
                                                        <span>Shop Now</span>
                                                    </button>
                                                </Link>
                                    </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                   
                        <div className="col-sm-12 col-md-4 boxR3o">
                        <div className="inner-box">
                        <div className="b5">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                    <div className="box1-content-header">
                                        JEWELRY
                                    </div>
                                    <div className="box1-content-sub">
                                        Shop designer brands
                                    </div>
                                    <div className="box1-content">
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4 boxR3o R3o3">
                    <div className="inner-box">
                        <div className="b6">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                <div className="box1-content-header">
                                    Clothes
                                </div>
                                <div className="box1-content-sub">
                                    All major brands
                                </div>
                                    <div className='box1-content'>
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                        <div className="col-sm-12 col-md-4 boxR3e R3e2">
                        <div className="inner-box">
                        <div className="b7">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                    <div className="box1-content-header">
                                        Household
                                    </div>
                                    <div className="box1-content-sub">
                                        Hand sanitizer in stock
                                    </div>
                                    <div className="box1-content">
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                    <div className="col-sm-12 col-md-4 boxR3e R3e3">
                        <div className="inner-box">
                        <div className="b8">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                <div className="box1-content-header">
                                    Pet
                                </div>
                                <div className="box1-content-sub">
                                    Supplies for pets
                                </div>
                                    <div className='box1-content'>
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="col-sm-12 col-md-4 boxR3o R3o1">
                        <div className="inner-box">
                        <div className="b9">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                    <div className="box1-content-header">
                                        Automotive
                                    </div>
                                    <div className="box1-content-sub">
                                        All your automobile needs
                                    </div>
                                    <div className="box1-content">
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    <div className="col-sm-12 col-md-4 boxR3o R3o3">
                    <div className="inner-box">
                        <div className="b10">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                <div className="box1-content-header">
                                    Books
                                </div>
                                <div className="box1-content-sub">
                                    Best selection of authors
                                </div>
                                    <div className='box1-content'>
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                        <div className="col-sm-12 col-md-4 boxR3o R3o2">
                        <div className="inner-box">
                        <div className="b11">
                            <div className="box-shadow boxr3-content-inner">
                            <div className="content-box">
                                    <div className="box1-content-header">
                                        New Categories
                                    </div>
                                    <div className="box1-content-sub">
                                        Coming soon!
                                    </div>
                                    <div className="box1-content">
                                        <Link to="/">
                                            <button className="btn btn-header">
                                                <span>Shop Now</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                </div>
                    
            </div>
        )
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps,{ logoutUser })(Home)