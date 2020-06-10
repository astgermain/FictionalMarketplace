import React, { Component } from 'react'

class Loading extends Component {
    
    constructor() {
        super()
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    render(){
        return( 
            <div className="loadingContainer">
                <div className="loader" id="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }

}

export default Loading