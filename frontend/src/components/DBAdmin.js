import React, { Component } from 'react';
import axios from 'axios';

class DBAdmin extends Component {
    // initialize our state
    state = {
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
  
    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries
  
    // our first get method that uses our backend api to
    // fetch data from our data base
    
    getDataFromDb = () => {
      fetch('https://localhost:4000/api/project')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }))
        .catch(err => this.setState({ data: [] }))
    };

    createProject = () => {
      axios.post('https://localhost:4000/api/project', {
        name: this.state.name,
        link: this.state.link,
        image: this.state.image,
        about: this.state.about,
      });
    };
  
    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      axios.delete('https://localhost:4000/api/project/' + idTodelete, {
        data: {
          _id: idTodelete,
        },

      })
      .catch(function (error){
        console.log("Delete from DB error");
      }
    )};
  
    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      this.state.data.forEach((dat) => {
        if (dat.id === idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
      axios.post('https://localhost:4000/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
      });
    };

    
  
    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
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
        <div>
          <ul>
            {dl <= 0
              ? 'NO DB ENTRIES YET'
              //should map to state and let it rerender itself
              : data.map((dat) => (
                <li key={dat._id} style={{ padding: '10px' }}>
                  <span style={{ color: 'gray' }}> id: </span> {dat._id} <br />
                  <span style={{ color: 'gray' }}> name: </span> {dat.name} <br />
                  <span style={{ color: 'gray' }}> link: </span> {dat.link} <br />
                  <span style={{ color: 'gray' }}> image: </span> {dat.image} <br />
                  <span style={{ color: 'gray' }}> about: </span> {dat.about} 
                  <button onClick={() => this.deleteFromDB(dat._id)}>
                    DELETE
                  </button>
                </li>
              ))}
          </ul>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Project Name"
              style={{ width: '200px' }}
            />
            <input
              type="text"
              onChange={(e) => this.setState({ link: e.target.value })}
              placeholder="Project Link"
              style={{ width: '200px' }}
            />
            <input
              type="text"
              onChange={(e) => this.setState({ image: e.target.value })}
              placeholder="Project Image"
              style={{ width: '200px' }}
            />
            <input
              type="text"
              onChange={(e) => this.setState({ about: e.target.value })}
              placeholder="Project About"
              style={{ width: '200px' }}
            />
            <button onClick={() => this.createProject(this.state.message)}>
              CREATE
            </button>
          </div>
          
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToUpdate: e.target.value })}
              placeholder="id of item to update here"
            />
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ updateToApply: e.target.value })}
              placeholder="put new value of the item here"
            />
            <button
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </button>
          </div>
        </div>
      );
    }
  }
  
  export default DBAdmin;