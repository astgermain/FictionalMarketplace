import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Jump from 'react-reveal/Jump';


class Projects extends Component {

    state = {
        opened: false,
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        name: null,
        link: null,
        image: null,
        about: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        
    }
    
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        
    }
    getDataFromDb = () => {
        fetch('/api/project')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }))
            .catch(err => this.setState({ data: [] }))
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleClick() {
        this.setState({ opened: !this.state.opened});
    }
    render() {
        let data = this.state.data
        let dl = 0
        try{
            dl = data.length
        }
        catch{
            dl = 0
        }

        return (
            <Jump>
                <div className="project">
                    <h1 className="mainHeader">
                        Projects
                    </h1>
                    <h2 className="subHeader">
                        This is just a few of my personal projects.
                    </h2>
                    <h2 className="subHeader">
                        If there is no link to source code the project is under NDA, email me for a snippet.
                    </h2>
                    <div className="row">
                        {dl <= 0
                        ? 'No Projects yet'
                        //should map to state and let it rerender itself
                        : data.map((dat) => (
                            <div key={dat._id} className="col-sm-12 col-md-6 projectBoxes">
                                <div className="card">
                                    <div className="img-container">
                                        <img src={dat.image} className="card-img-top" alt=""></img>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{dat.name}</h5>
                                        <p className="card-text">{dat.about}</p>
                                        <div className="row">
                                            <div className="col-12">
                                                <a href={dat.link} className="btn btn-header">See More</a>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Jump>
    );
  }
}
Projects.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Projects);