import React, { Component } from 'react'

class Footer extends Component {

    constructor() {
        super();
        this.state = {
            
        };
    }

    

    

    

    render(){
        return(
            <div>
            <div className="clear"></div>
            <div className="row footer">
                <div className="col-md-4 col-12">
                &copy; 2020 Name. All Rights Reserved.   
                </div>
                <div className="col-md-4 col-12">
                E-Mail: <a href="mailto:astgermain@mail.sfsu.edu">astgermain@mail.sfsu.edu</a>
                </div>
                <div className="col-md-4 col-12">
                Phone: +1-310-696-9341  
                </div>
            </div>
            </div>
        )
    }
}


export default Footer;